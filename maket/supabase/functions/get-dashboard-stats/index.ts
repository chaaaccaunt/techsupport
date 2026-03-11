import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [equipmentResult, ticketsResult, maintenanceResult] = await Promise.all([
      supabase.from('equipment').select('status', { count: 'exact' }),
      supabase.from('tickets').select('status, priority', { count: 'exact' }),
      supabase.from('maintenance_history').select('maintenance_type', { count: 'exact' })
    ]);

    if (equipmentResult.error) throw equipmentResult.error;
    if (ticketsResult.error) throw ticketsResult.error;
    if (maintenanceResult.error) throw maintenanceResult.error;

    const equipmentByStatus = equipmentResult.data?.reduce((acc: any, item: any) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    const ticketsByStatus = ticketsResult.data?.reduce((acc: any, item: any) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    const ticketsByPriority = ticketsResult.data?.reduce((acc: any, item: any) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});

    const maintenanceByType = maintenanceResult.data?.reduce((acc: any, item: any) => {
      acc[item.maintenance_type] = (acc[item.maintenance_type] || 0) + 1;
      return acc;
    }, {});

    const stats = {
      equipment: {
        total: equipmentResult.count || 0,
        byStatus: equipmentByStatus || {}
      },
      tickets: {
        total: ticketsResult.count || 0,
        byStatus: ticketsByStatus || {},
        byPriority: ticketsByPriority || {}
      },
      maintenance: {
        total: maintenanceResult.count || 0,
        byType: maintenanceByType || {}
      }
    };

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});