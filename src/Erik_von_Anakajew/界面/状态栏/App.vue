<!-- eslint-disable better-tailwindcss/no-unknown-classes -->
<template>
  <main class="status-shell" aria-label="Erik 角色状态栏">
    <div class="energy-halo energy-halo--one" aria-hidden="true"></div>
    <div class="energy-halo energy-halo--two" aria-hidden="true"></div>

    <header class="masthead">
      <div class="masthead__line"></div>
      <p class="masthead__kicker">AION FIELD OBSERVATORY</p>
      <div class="masthead__sigil" aria-hidden="true">✦</div>
      <p class="masthead__place">安纳卡鸠庄园 · 地下实验室</p>
      <div class="masthead__line"></div>
    </header>

    <section class="primary-grid">
      <div class="portrait-column">
        <button class="portrait-frame" type="button" aria-label="上传Erik角色形象" @click="openFilePicker">
          <img :src="avatarSource" alt="Erik 角色形象" />
          <span class="portrait-frame__edit" aria-hidden="true">更换形象</span>
        </button>
        <input
          ref="fileInput"
          class="visually-hidden"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          aria-label="选择Erik角色形象图片"
          @change="handleAvatarUpload"
        />
        <button v-if="hasCustomAvatar" class="text-button" type="button" @click="removeCustomAvatar">
          恢复默认头像
        </button>
        <p v-if="avatarError" class="upload-error" role="alert">{{ avatarError }}</p>
        <div class="portrait-caption">
          <span>PRINCIPAL SCIENTIST</span>
          <strong>NO. E-23</strong>
        </div>
      </div>

      <div class="identity-column">
        <div class="identity-heading">
          <div>
            <p class="field-label">角色名称</p>
            <h1>{{ data.Erik._角色名称 }}</h1>
          </div>
          <div class="time-medallion" aria-label="当前故事时间">
            <span class="time-medallion__label">STORY TIME</span>
            <time>{{ data.世界.当前时间 }}</time>
          </div>
        </div>

        <div class="detail-grid">
          <article class="detail-card detail-card--clothing">
            <p class="field-label"><span aria-hidden="true">❧</span> 当前衣着</p>
            <p>{{ data.Erik.当前衣着 }}</p>
          </article>
          <article class="detail-card detail-card--thought">
            <p class="field-label"><span aria-hidden="true">❧</span> 此刻心理</p>
            <blockquote>“{{ data.Erik.当前心理 }}”</blockquote>
          </article>
        </div>

        <article class="privacy-card">
          <div>
            <p class="field-label"><span aria-hidden="true">◇</span> 私密生理状态</p>
            <p :class="['privacy-value', { 'privacy-value--masked': !showPrivate }]">
              {{ showPrivate ? data.Erik.性器状态 : '放松，无明显反应' }}
            </p>
          </div>
          <button
            class="icon-button"
            type="button"
            :aria-label="showPrivate ? '遮蔽性器状态' : '临时显示性器状态'"
            :aria-pressed="showPrivate"
            @click="showPrivate = !showPrivate"
          >
            <svg v-if="!showPrivate" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.4 10.4 0 0112 4c5.6 0 9.5 6 9.5 6a15 15 0 01-2.2 2.7M6.2 6.3C3.9 8 2.5 10 2.5 10s3.9 6 9.5 6a9.8 9.8 0 004-.9"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12S6.4 6 12 6s9.5 6 9.5 6-3.9 6-9.5 6-9.5-6-9.5-6z" />
              <circle cx="12" cy="12" r="2.6" />
            </svg>
          </button>
        </article>
      </div>
    </section>

    <section class="relationship-panel">
      <button
        class="relationship-toggle"
        type="button"
        :aria-expanded="relationshipExpanded"
        aria-controls="relationship-content"
        @click="relationshipExpanded = !relationshipExpanded"
      >
        <span><span aria-hidden="true">✧</span> 关系观测</span>
        <span class="relationship-toggle__phase">{{ data.Erik.关系阶段 }}</span>
        <span :class="['chevron', { 'chevron--up': relationshipExpanded }]" aria-hidden="true">⌄</span>
      </button>

      <div v-show="relationshipExpanded" id="relationship-content" class="relationship-content">
        <div class="metric">
          <div class="metric__meta">
            <span>理智值</span><strong>{{ data.Erik.理智值 }}</strong
            ><small>/ 100</small>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-label="Erik理智值"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="data.Erik.理智值"
          >
            <span class="track__fill track__fill--reason" :style="{ width: `${data.Erik.理智值}%` }"></span>
          </div>
        </div>
        <div class="metric">
          <div class="metric__meta">
            <span>欲望</span><strong>{{ data.Erik.欲望 }}</strong
            ><small>/ 100</small>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-label="Erik欲望值"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="data.Erik.欲望"
          >
            <span class="track__fill track__fill--desire" :style="{ width: `${data.Erik.欲望}%` }"></span>
          </div>
        </div>
        <div class="phase-seal">
          <span class="phase-seal__label">RELATION PHASE</span>
          <strong>{{ data.Erik.关系阶段 }}</strong>
          <span class="phase-seal__note">I · familiar orbit</span>
        </div>
      </div>
    </section>

    <footer class="status-footer">
      <span>AION / COGNITIVE–MEMORY ECHO</span>
      <i aria-hidden="true"></i>
      <span>READ-ONLY MVU FEED</span>
    </footer>
  </main>
</template>

<script setup lang="ts">
import defaultAvatar from './assets/erik-portrait.png?url';
import { useDataStore } from './store';

const AVATAR_KEY = 'tavern-erik-ui:portrait:v1';
const dataStore = useDataStore();
const data = computed(() => dataStore.data);
const relationshipExpanded = ref(true);
const showPrivate = ref(false);
const fileInput = ref<HTMLInputElement>();
const avatarError = ref('');
const avatarSource = ref(localStorage.getItem(AVATAR_KEY) || defaultAvatar);
const hasCustomAvatar = computed(() => avatarSource.value !== defaultAvatar);

function openFilePicker() {
  fileInput.value?.click();
}

function removeCustomAvatar() {
  localStorage.removeItem(AVATAR_KEY);
  avatarSource.value = defaultAvatar;
  avatarError.value = '';
  if (fileInput.value) fileInput.value.value = '';
}

function handleAvatarUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  avatarError.value = '';
  if (!file) return;
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    avatarError.value = '请选择 PNG、JPG 或 WebP 图片。';
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => (avatarError.value = '读取图片失败，请重新选择。');
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => (avatarError.value = '无法解析这张图片。');
    image.onload = () => {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      if (!context) {
        avatarError.value = '浏览器无法处理这张图片。';
        return;
      }
      const scale = Math.max(size / image.naturalWidth, size / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      const compressed = canvas.toDataURL('image/jpeg', 0.88);
      try {
        localStorage.setItem(AVATAR_KEY, compressed);
        avatarSource.value = compressed;
      } catch {
        avatarError.value = '浏览器本地空间不足，头像未能保存。';
      }
    };
    image.src = String(reader.result);
  };
  reader.readAsDataURL(file);
}
</script>

<style scoped>
.status-shell {
  --ink: #2b3440;
  --muted: #6b7078;
  --gold: #b89a5e;
  --gold-light: #e5d4a7;
  --ice: #78bdd8;
  --ice-pale: #e8f7fb;
  position: relative;
  isolation: isolate;
  width: min(100%, 1180px);
  margin: 0 auto;
  overflow: hidden;
  padding: clamp(22px, 3.5vw, 48px);
  color: var(--ink);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(251, 247, 237, 0.95)),
    repeating-linear-gradient(45deg, rgba(184, 154, 94, 0.035) 0 1px, transparent 1px 9px);
  border: 1px solid rgba(184, 154, 94, 0.62);
  border-radius: 30px 8px 30px 8px;
  box-shadow:
    0 22px 70px rgba(53, 72, 83, 0.18),
    inset 0 0 0 5px #fffdf8,
    inset 0 0 0 6px rgba(184, 154, 94, 0.28);
}

.status-shell::before,
.status-shell::after {
  position: absolute;
  z-index: -1;
  width: 150px;
  height: 150px;
  color: rgba(184, 154, 94, 0.52);
  font-size: 130px;
  line-height: 1;
  content: '\2767';
}

.status-shell::before {
  top: -25px;
  left: -22px;
  transform: rotate(132deg);
}
.status-shell::after {
  right: -22px;
  bottom: -25px;
  transform: rotate(-48deg);
}

.energy-halo {
  position: absolute;
  z-index: -2;
  border: 1px solid rgba(89, 183, 217, 0.34);
  border-radius: 50%;
  box-shadow:
    0 0 50px rgba(87, 194, 225, 0.25),
    inset 0 0 35px rgba(133, 213, 237, 0.18);
}
.energy-halo--one {
  top: -125px;
  right: 12%;
  width: 270px;
  height: 270px;
}
.energy-halo--two {
  bottom: -145px;
  left: 22%;
  width: 300px;
  height: 300px;
}

.masthead {
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
  align-items: center;
  gap: 13px;
  margin-bottom: 26px;
  color: #806b42;
}
.masthead__line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.masthead p {
  margin: 0;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.masthead__kicker {
  font:
    600 10px/1.2 Georgia,
    serif;
}
.masthead__place {
  font-size: 12px;
  letter-spacing: 0.16em !important;
}
.masthead__sigil {
  color: var(--ice);
  filter: drop-shadow(0 0 8px #9edaf0);
}

.primary-grid {
  display: grid;
  grid-template-columns: minmax(175px, 220px) minmax(0, 1fr);
  gap: clamp(25px, 4vw, 54px);
}
.portrait-column {
  min-width: 0;
}
.portrait-frame {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  padding: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #fffdfa;
  border: 1px solid var(--gold);
  border-radius: 100px 100px 12px 12px;
  box-shadow:
    0 12px 30px rgba(71, 79, 80, 0.17),
    inset 0 0 0 4px #f5ecda;
}
.portrait-frame::before {
  position: absolute;
  inset: 14px;
  z-index: 1;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 88px 88px 7px 7px;
  content: '';
}
.portrait-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 91px 91px 7px 7px;
  transition:
    filter 180ms ease,
    transform 220ms ease;
}
.portrait-frame:hover img {
  filter: brightness(0.88);
  transform: scale(1.025);
}
.portrait-frame__edit {
  position: absolute;
  right: 20px;
  bottom: 18px;
  left: 20px;
  z-index: 2;
  padding: 7px;
  opacity: 0;
  color: white;
  background: rgba(36, 53, 62, 0.72);
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.18em;
  transition: opacity 180ms ease;
}
.portrait-frame:hover .portrait-frame__edit,
.portrait-frame:focus-visible .portrait-frame__edit {
  opacity: 1;
}
.text-button {
  display: block;
  margin: 11px auto 0;
  padding: 5px 8px;
  cursor: pointer;
  color: #746140;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(184, 154, 94, 0.38);
  font-size: 11px;
}
.upload-error {
  margin: 8px 0 0;
  color: #9c3e45;
  font-size: 11px;
  text-align: center;
}
.portrait-caption {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
  padding: 0 5px;
  color: #7a725f;
  font:
    9px/1.3 Georgia,
    serif;
  letter-spacing: 0.12em;
}
.portrait-caption strong {
  color: #6d9aab;
  font-weight: 600;
}

.identity-column {
  min-width: 0;
}
.identity-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 19px;
  border-bottom: 1px solid rgba(184, 154, 94, 0.42);
}
.field-label {
  margin: 0 0 8px;
  color: #967e4e;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.17em;
}
h1 {
  margin: 0;
  color: #263744;
  font:
    500 clamp(26px, 4vw, 42px)/1.12 Georgia,
    'Noto Serif SC',
    serif;
  letter-spacing: 0.02em;
}
.time-medallion {
  flex: 0 0 auto;
  min-width: 178px;
  padding: 12px 17px;
  text-align: center;
  background: linear-gradient(120deg, rgba(228, 247, 252, 0.8), rgba(255, 253, 247, 0.92));
  border: 1px solid rgba(102, 177, 203, 0.5);
  border-radius: 50px 12px 50px 12px;
  box-shadow: 0 0 24px rgba(100, 194, 224, 0.13);
}
.time-medallion__label {
  display: block;
  margin-bottom: 4px;
  color: #6599ad;
  font:
    600 9px Georgia,
    serif;
  letter-spacing: 0.16em;
}
.time-medallion time {
  color: #374c59;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 20px;
}
.detail-card {
  min-width: 0;
  min-height: 108px;
  padding: 17px 19px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(184, 154, 94, 0.27);
  border-radius: 4px 20px 4px 20px;
}
.detail-card > p:last-child,
.detail-card blockquote {
  margin: 0;
  color: #414952;
  font-size: 14px;
  line-height: 1.8;
}
.detail-card blockquote {
  color: #47616d;
  font-style: italic;
}
.detail-card--thought {
  background: linear-gradient(135deg, rgba(234, 247, 251, 0.75), rgba(255, 255, 255, 0.5));
  border-color: rgba(106, 179, 203, 0.32);
}

.privacy-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 14px;
  padding: 13px 17px;
  background: rgba(245, 239, 225, 0.52);
  border-left: 2px solid var(--gold);
}
.privacy-card p {
  margin-top: 0;
}
.privacy-value {
  margin-bottom: 0;
  color: #4d5054;
  font-size: 13px;
  transition: filter 160ms ease;
}
.privacy-value--masked {
  user-select: none;
  filter: blur(5px);
}
.icon-button {
  display: grid;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  padding: 8px;
  cursor: pointer;
  color: #6e8f9b;
  background: #fffdf7;
  border: 1px solid rgba(184, 154, 94, 0.46);
  border-radius: 50%;
  place-items: center;
}
.icon-button svg {
  width: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
}

.relationship-panel {
  margin-top: 27px;
  background: rgba(255, 255, 255, 0.43);
  border: 1px solid rgba(184, 154, 94, 0.38);
  border-radius: 3px 24px 3px 24px;
}
.relationship-toggle {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  width: 100%;
  padding: 14px 19px;
  cursor: pointer;
  color: #78633d;
  background: transparent;
  border: 0;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: left;
}
.relationship-toggle__phase {
  margin-right: 22px;
  color: #588ca0;
  font-size: 12px;
  font-weight: 500;
}
.chevron {
  font-size: 22px;
  transition: transform 180ms ease;
}
.chevron--up {
  transform: rotate(180deg);
}
.relationship-content {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(150px, 0.55fr);
  gap: clamp(18px, 3vw, 35px);
  padding: 23px 25px 25px;
  border-top: 1px solid rgba(184, 154, 94, 0.25);
}
.metric {
  align-self: center;
}
.metric__meta {
  display: flex;
  align-items: baseline;
  margin-bottom: 9px;
  color: #5e6268;
  font-size: 12px;
}
.metric__meta span {
  margin-right: auto;
  letter-spacing: 0.12em;
}
.metric__meta strong {
  color: #334958;
  font:
    500 22px Georgia,
    serif;
}
.metric__meta small {
  margin-left: 3px;
  color: #92958f;
}
.track {
  height: 8px;
  overflow: hidden;
  background: #e5e0d5;
  border-radius: 999px;
  box-shadow: inset 0 1px 2px rgba(73, 79, 79, 0.12);
}
.track__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  box-shadow: 0 0 12px currentColor;
}
.track__fill--reason {
  color: #65bbd7;
  background: linear-gradient(90deg, #a7dce9, #5baac9);
}
.track__fill--desire {
  color: #c3a269;
  background: linear-gradient(90deg, #ead8af, #b9975e);
}
.phase-seal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85px;
  padding: 12px;
  text-align: center;
  background: radial-gradient(circle, rgba(229, 247, 252, 0.88), rgba(255, 253, 247, 0.75));
  border: 1px solid rgba(102, 177, 203, 0.34);
  border-radius: 50%;
}
.phase-seal__label {
  color: #719bab;
  font:
    8px Georgia,
    serif;
  letter-spacing: 0.14em;
}
.phase-seal strong {
  margin: 5px 0 2px;
  color: #476571;
  font-size: 15px;
  letter-spacing: 0.14em;
}
.phase-seal__note {
  color: #9c8d70;
  font:
    italic 9px Georgia,
    serif;
}

.status-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
  color: #9a8b70;
  font:
    8px Georgia,
    serif;
  letter-spacing: 0.15em;
}
.status-footer i {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-light), var(--ice), var(--gold-light));
}
.visually-hidden {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 760px) {
  .status-shell {
    padding: 24px 18px;
    border-radius: 22px 6px 22px 6px;
  }
  .masthead {
    grid-template-columns: 1fr auto 1fr;
  }
  .masthead__kicker,
  .masthead__place {
    grid-column: 2;
    text-align: center;
  }
  .masthead__sigil {
    grid-column: 2;
    grid-row: 2;
  }
  .masthead__line:first-child {
    grid-column: 1;
    grid-row: 2;
  }
  .masthead__line:last-child {
    grid-column: 3;
    grid-row: 2;
  }
  .primary-grid {
    grid-template-columns: 1fr;
  }
  .portrait-column {
    width: min(70%, 260px);
    margin: 0 auto;
  }
  .identity-heading {
    flex-direction: column;
  }
  .time-medallion {
    width: 100%;
  }
  .detail-grid,
  .relationship-content {
    grid-template-columns: 1fr;
  }
  .phase-seal {
    min-height: 105px;
    border-radius: 28px 5px 28px 5px;
  }
  .relationship-toggle__phase {
    margin-right: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
