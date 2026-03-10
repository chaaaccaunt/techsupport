
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import Card from '../../components/base/Card';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        setUser(authUser);
        setFormData({
          full_name: profile?.full_name || '',
          email: authUser.email || '',
          phone: profile?.phone || '',
          position: profile?.position || '',
          department: profile?.department || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          position: formData.position,
          department: formData.department,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      alert('✅ Профиль успешно обновлен!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('❌ Ошибка при сохранении профиля');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('❌ Пароли не совпадают');
      return;
    }

    if (formData.newPassword.length < 6) {
      alert('❌ Пароль должен содержать минимум 6 символов');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      alert('✅ Пароль успешно изменен!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('❌ Ошибка при изменении пароля');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Мой профиль</h1>
        <p className="text-sm text-gray-600 mt-1">Управляйте своей учетной записью и настройками безопасности</p>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <div className="flex items-center space-x-6 p-6">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {formData.full_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{formData.full_name || 'Пользователь'}</h2>
            <p className="text-sm text-gray-600 mt-1">{formData.email}</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-briefcase-line mr-2"></i>
                {formData.position || 'Не указано'}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <i className="ri-building-line mr-2"></i>
                {formData.department || 'Не указано'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'info'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-user-line mr-2"></i>
          Личная информация
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-lock-line mr-2"></i>
          Безопасность
        </button>
      </div>

      {/* Personal Info Tab */}
      {activeTab === 'info' && (
        <Card>
          <form onSubmit={handleSaveProfile} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Личная информация</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email нельзя изменить</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Должность
                  </label>
                  <Input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Системный администратор"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Отдел <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                  required
                >
                  <option value="">Выберите отдел</option>
                  <option value="IT">IT</option>
                  <option value="Бухгалтерия">Бухгалтерия</option>
                  <option value="HR">HR</option>
                  <option value="Продажи">Продажи</option>
                  <option value="Маркетинг">Маркетинг</option>
                  <option value="Производство">Производство</option>
                  <option value="Логистика">Логистика</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card>
          <form onSubmit={handleChangePassword} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Изменить пароль</h3>
            
            <div className="space-y-5 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текущий пароль
                </label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Введите текущий пароль"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Новый пароль <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Минимум 6 символов"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите пароль <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Повторите новый пароль"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <i className="ri-information-line text-blue-600 mr-3 text-lg"></i>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Требования к паролю</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Минимум 6 символов</li>
                      <li>• Используйте комбинацию букв и цифр</li>
                      <li>• Избегайте простых паролей</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Изменение...
                  </>
                ) : (
                  <>
                    <i className="ri-lock-password-line mr-2"></i>
                    Изменить пароль
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
