<template>
  <div
    class="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300"
  >
    <!-- 移除主题切换按钮 -->

    <div class="grain-overlay"></div>

    <!-- Animated Blobs -->
    <div class="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <div
        class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob"
      ></div>
      <div
        class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-400 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-indigo-400 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-4000"
      ></div>
    </div>

    <main
      class="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
    >
      <!-- Left Content (Hidden on mobile) -->
      <div class="hidden lg:flex flex-col flex-1 items-start justify-center space-y-8 animate-fade-in-up">
        <div class="relative w-full aspect-square max-w-[500px]">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative w-64 h-64">
              <div
                class="absolute inset-0 border-2 border-white/30 dark:border-white/10 rounded-full animate-[spin_10s_linear_infinite]"
              ></div>
              <div
                class="absolute inset-4 border border-white/40 dark:border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed"
              ></div>
              <div class="absolute top-0 right-0 p-4 glass-card rounded-2xl transform rotate-12 animate-bounce">
                <span class="material-icons-round text-4xl text-primary">cloud_queue</span>
              </div>
              <div
                class="absolute bottom-10 left-0 p-4 glass-card rounded-2xl transform -rotate-6 animate-bounce"
                style="animation-delay: 1s"
              >
                <span class="material-icons-round text-4xl text-secondary">security</span>
              </div>
              <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 glass-card rounded-full shadow-2xl"
              >
                <img
                  alt="Logo"
                  class="w-16 h-16 opacity-90"
                  src="@/assets/images/logo.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="text-left max-w-md pl-4">
          <h2 class="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            安全的企业级开发平台
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 font-light">
            管理您的基础设施，大规模部署，并与团队无缝协作。
          </p>
        </div>
      </div>

      <!-- Login Form Card -->
      <div class="w-full max-w-md flex-1">
        <div class="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div class="text-center">
            <div class="inline-flex items-center justify-center gap-2 ">
              <div
                class=" flex items-center justify-center"
              >
                <img src="@/assets/images/logo.png" class="w-50 h-30" alt="logo" />
              </div>
            </div>
          </div>

          <a-form :model="loginFormModel" class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" for="username"
                >用户名</label
              >
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span
                    class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors text-xl"
                    >person_outline</span
                  >
                </div>
                <input
                  id="username"
                  v-model="loginFormModel.username"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                  placeholder="请输入用户名"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" for="password"
                >密码</label
              >
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span
                    class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors text-xl"
                    >lock_open</span
                  >
                </div>
                <input
                  id="password"
                  v-model="loginFormModel.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                  placeholder="请输入密码"
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  @click="showPassword = !showPassword"
                >
                  <span
                    class="material-icons-round text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-xl"
                  >
                    {{ showPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Verify Code -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1" for="verifyCode"
                >验证码</label
              >
              <div class="relative group flex gap-2">
                <div class="relative flex-1">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span
                      class="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors text-xl"
                      >verified_user</span
                    >
                  </div>
                  <input
                    id="verifyCode"
                    v-model="loginFormModel.verifyCode"
                    type="text"
                    required
                    maxlength="4"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl leading-5 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                    placeholder="请输入验证码"
                  />
                </div>
                <div class="w-32 h-11 rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-600 shadow-sm" @click="updateCaptcha">
                  <img :src="captcha" class="w-full h-full object-cover" alt="captcha" />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded bg-white/50 dark:bg-slate-800/50 dark:border-gray-600"
                />
                <label class="ml-2 block text-sm text-gray-600 dark:text-gray-300" for="remember-me">
                  记住我 30 天
                </label>
              </div>
              <!-- 移除 Forgot password -->
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-primary hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
              ></span>
              {{ loading ? '登录中...' : '登录' }}
            </button>
<!-- 
            <div class="relative mt-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600/50"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-transparent text-gray-500 glass-card dark:text-gray-400 rounded-md text-xs"
                  >其他登录方式</span
                >
              </div>
            </div> -->
<!-- 
            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span class="material-icons-round text-xl mr-2 text-[#4285F4]">google</span>
                <span class="sr-only">使用 Google 登录</span>
              </button>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span class="material-icons-round text-xl mr-2 text-gray-900 dark:text-white">hub</span>
                <span class="sr-only">使用 GitHub 登录</span>
              </button>
            </div> -->
          </a-form>
          <p class="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
            还没有账号？
            <a class="font-medium text-primary hover:text-purple-600" href="#">申请访问权限</a>
          </p>
        </div>
        <div class="mt-6 text-center lg:hidden">
          <p class="text-xs text-gray-500 dark:text-gray-400/80">
            © 2026 Nuct. 保留所有权利。
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { message, Modal } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import Api from '@/api/';
  import { to } from '@/utils/awaitTo';

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const loading = ref(false);
  const captcha = ref('');
  const showPassword = ref(false);
  const isDark = ref(document.documentElement.classList.contains('dark'));

  const loginFormModel = ref({
    username: 'admin',
    password: 'a123456',
    verifyCode: '',
    captchaId: '',
  });

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    isDark.value = document.documentElement.classList.contains('dark');
  };

  const updateCaptcha = async () => {
    const data = await Api.captcha.captchaCaptchaByImg({ width: 120, height: 44 });
    captcha.value = data.img;
    loginFormModel.value.captchaId = data.id;
  };

  onMounted(() => {
    updateCaptcha();
  });

  const handleSubmit = async () => {
    const { username, password, verifyCode } = loginFormModel.value;
    if (username.trim() == '' || password.trim() == '') {
      return message.warning('用户名或密码不能为空！');
    }
    if (!verifyCode) {
      return message.warning('请输入验证码！');
    }
    message.loading('登录中...', 0);
    loading.value = true;
    const [err] = await to(userStore.login(loginFormModel.value));
    if (err) {
      Modal.error({
        title: () => '提示',
        content: () => err.message,
      });
      updateCaptcha();
    } else {
      message.success('登录成功！');
      setTimeout(() => router.replace((route.query.redirect as string) || '/'));
    }
    loading.value = false;
    message.destroy();
  };
</script>

<style lang="less" scoped>
  :root {
    --primary: #8b5cf6;
    --secondary: #ec4899;
  }

  .text-primary {
    color: #8b5cf6;
  }
  .bg-primary {
    background-color: #8b5cf6;
  }
  .text-secondary {
    color: #ec4899;
  }
  .bg-secondary {
    background-color: #ec4899;
  }
  .focus\:ring-primary:focus {
    --tw-ring-color: #8b5cf6;
  }
  .focus\:border-primary:focus {
    border-color: #8b5cf6;
  }

  .font-display {
    font-family: 'Space Grotesk', sans-serif;
  }

  .grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  }

  :global(.dark) .glass-card {
    background: rgba(17, 25, 40, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .group-hover\:animate-\[shimmer_1\.5s_infinite\]:hover {
    animation: shimmer 1.5s infinite;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
</style>
