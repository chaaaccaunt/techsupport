import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Button from '../../../components/base/Button';
import Input from '../../../components/base/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        window.REACT_APP_NAVIGATE('/');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            department: department,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        setError('');
        alert('Регистрация успешна! Проверьте email для подтверждения.');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isSignUp ? handleSignUp : handleLogin;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mx-auto mb-4 shadow-lg">
              <i className="ri-tools-line text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Создать аккаунт' : 'Добро пожаловать'}
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Зарегистрируйтесь для доступа к системе' 
                : 'Войдите в систему управления оборудованием'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Отдел <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
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
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-600">Запомнить меня</span>
                </label>
                <button
                  type="button"
                  className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Забыли пароль?
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <i className="ri-error-warning-line text-red-600 text-lg mr-2 flex-shrink-0 mt-0.5"></i>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {isSignUp ? 'Регистрация...' : 'Вход...'}
                </>
              ) : (
                <>
                  <i className={`${isSignUp ? 'ri-user-add-line' : 'ri-login-box-line'} mr-2`}></i>
                  {isSignUp ? 'Зарегистрироваться' : 'Войти'}
                </>
              )}
            </Button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer"
              >
                {isSignUp ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">или продолжить с</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <i className="ri-google-fill text-xl text-red-500 mr-2"></i>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <i className="ri-microsoft-fill text-xl text-blue-500 mr-2"></i>
              <span className="text-sm font-medium text-gray-700">Microsoft</span>
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Входя в систему, вы соглашаетесь с{' '}
              <a href="#" className="text-teal-600 hover:text-teal-700">
                Условиями использования
              </a>
              {' '}и{' '}
              <a href="#" className="text-teal-600 hover:text-teal-700">
                Политикой конфиденциальности
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <i className="ri-shield-check-line text-5xl"></i>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Управляйте оборудованием эффективно
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Современная система для контроля технического состояния, планирования обслуживания и управления заявками
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg mr-4 flex-shrink-0">
                <i className="ri-check-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Полный контроль</h3>
                <p className="text-sm text-white/80">
                  Отслеживайте все оборудование и его техническое состояние в реальном времени
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg mr-4 flex-shrink-0">
                <i className="ri-check-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Автоматизация процессов</h3>
                <p className="text-sm text-white/80">
                  Планируйте техническое обслуживание и получайте уведомления автоматически
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg mr-4 flex-shrink-0">
                <i className="ri-check-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Аналитика и отчеты</h3>
                <p className="text-sm text-white/80">
                  Получайте детальные отчеты и анализируйте эффективность работы
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm text-white/80">Единиц оборудования</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/80">Время работы</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/80">Поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
