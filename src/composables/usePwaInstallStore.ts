import { ref, onMounted } from 'vue'

// Type definition for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function usePwaInstallPrompt() {
  const installReady = ref(false)
  let deferredPrompt: BeforeInstallPromptEvent | null = null

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e as BeforeInstallPromptEvent
      installReady.value = true
    })
  })

  const promptInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    installReady.value = false
  }

  return { installReady, promptInstall }
}
