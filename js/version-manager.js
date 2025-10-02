/**
 * 🔖 Version Manager
 * GGP Academy 버전 관리 및 What's New 시스템
 */

class VersionManager {
  constructor() {
    this.versionData = null;
    this.lastSeenVersion = this.getLastSeenVersion();
    this.init();
  }

  async init() {
    try {
      await this.loadVersionData();
      this.checkForUpdates();
    } catch (error) {
      console.error('버전 데이터 로드 실패:', error);
    }
  }

  async loadVersionData() {
    const response = await fetch('/ggp-academy/version.json');
    this.versionData = await response.json();
    return this.versionData;
  }

  getLastSeenVersion() {
    return localStorage.getItem('ggp_last_seen_version') || null;
  }

  setLastSeenVersion(version) {
    localStorage.setItem('ggp_last_seen_version', version);
    this.lastSeenVersion = version;
  }

  getCurrentVersion() {
    return this.versionData?.current || '2.0.0';
  }

  getVersionInfo(version) {
    return this.versionData?.versions.find(v => v.version === version);
  }

  checkForUpdates() {
    const currentVersion = this.getCurrentVersion();

    if (!this.lastSeenVersion) {
      // 첫 방문
      this.showWelcomeMessage();
      this.setLastSeenVersion(currentVersion);
    } else if (this.lastSeenVersion !== currentVersion) {
      // 업데이트 감지
      this.showWhatsNew(this.lastSeenVersion, currentVersion);
      this.setLastSeenVersion(currentVersion);
    }
  }

  showWelcomeMessage() {
    const currentVersion = this.getCurrentVersion();
    const versionInfo = this.getVersionInfo(currentVersion);

    const html = `
      <div class="whats-new-banner" style="
        position: fixed;
        top: 80px;
        right: 20px;
        max-width: 400px;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
      ">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
          <div>
            <div style="font-size: 24px; margin-bottom: 4px;">👋</div>
            <h3 style="color: white; font-size: 20px; font-weight: 700; margin: 0;">
              GGP Academy에 오신 것을 환영합니다!
            </h3>
          </div>
          <button onclick="window.versionManager.closeWhatsNew()" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 8px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">×</button>
        </div>

        <div style="color: rgba(255, 255, 255, 0.95); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
          현재 버전: <strong>v${currentVersion}</strong><br>
          ${versionInfo?.name || 'Latest Version'}
        </div>

        <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="color: white; font-size: 13px; font-weight: 600; margin-bottom: 8px;">✨ 주요 기능</div>
          <ul style="margin: 0; padding-left: 20px; color: rgba(255, 255, 255, 0.9); font-size: 13px;">
            ${versionInfo?.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('') || ''}
          </ul>
        </div>

        <button onclick="window.versionManager.openVersionModal()" style="
          width: 100%;
          background: white;
          color: #1e40af;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
          📚 시작하기
        </button>
      </div>

      <style>
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // 10초 후 자동 닫기
    setTimeout(() => this.closeWhatsNew(), 10000);
  }

  showWhatsNew(fromVersion, toVersion) {
    const toVersionInfo = this.getVersionInfo(toVersion);
    const fromVersionInfo = this.getVersionInfo(fromVersion);

    const html = `
      <div class="whats-new-banner" style="
        position: fixed;
        top: 80px;
        right: 20px;
        max-width: 420px;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
      ">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
          <div>
            <div style="font-size: 28px; margin-bottom: 4px;">🎉</div>
            <h3 style="color: white; font-size: 20px; font-weight: 700; margin: 0;">
              새로운 기능이 추가되었습니다!
            </h3>
          </div>
          <button onclick="window.versionManager.closeWhatsNew()" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 8px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">×</button>
        </div>

        <div style="
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
        ">
          <span style="opacity: 0.7;">v${fromVersion}</span>
          <span style="font-size: 18px;">→</span>
          <span style="background: rgba(255, 255, 255, 0.3); padding: 4px 12px; border-radius: 6px;">v${toVersion}</span>
        </div>

        <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
          <div style="color: white; font-size: 13px; font-weight: 600; margin-bottom: 8px;">✨ ${toVersionInfo?.name || 'New Features'}</div>
          <ul style="margin: 0; padding-left: 20px; color: rgba(255, 255, 255, 0.95); font-size: 13px; line-height: 1.6;">
            ${toVersionInfo?.highlights.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('') || ''}
          </ul>
        </div>

        <div style="display: flex; gap: 8px;">
          <button onclick="window.versionManager.openVersionModal()" style="
            flex: 1;
            background: white;
            color: #047857;
            border: none;
            border-radius: 8px;
            padding: 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          ">
            📋 자세히 보기
          </button>
          <button onclick="window.versionManager.compareVersions('${fromVersion}', '${toVersion}')" style="
            flex: 1;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            padding: 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
          ">
            🔄 비교하기
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // 15초 후 자동 닫기
    setTimeout(() => this.closeWhatsNew(), 15000);
  }

  closeWhatsNew() {
    const banner = document.querySelector('.whats-new-banner');
    if (banner) {
      banner.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => banner.remove(), 300);
    }
  }

  openVersionModal() {
    this.closeWhatsNew();
    const currentVersion = this.getCurrentVersion();
    const versionInfo = this.getVersionInfo(currentVersion);
    const roadmap = this.versionData?.roadmap || [];

    const modal = document.createElement('div');
    modal.className = 'version-modal-overlay';
    modal.innerHTML = `
      <div class="version-modal">
        <div class="version-modal-header">
          <div>
            <h2 style="color: white; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
              🚀 GGP Academy
            </h2>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="version-badge current">v${currentVersion}</span>
              <span style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                ${versionInfo?.released || '2025-10-02'}
              </span>
            </div>
          </div>
          <button onclick="window.versionManager.closeVersionModal()" class="modal-close-btn">×</button>
        </div>

        <div class="version-modal-body">
          <!-- Current Version -->
          <div class="version-section">
            <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
              ✨ 현재 버전
            </h3>
            <div class="version-card current-version">
              <div style="font-size: 18px; font-weight: 600; color: white; margin-bottom: 12px;">
                ${versionInfo?.name || 'Current Release'}
              </div>
              <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                ${versionInfo?.highlights.map(h => `
                  <div style="display: flex; align-items: start; gap: 8px; margin-bottom: 8px;">
                    <span style="color: #10b981; font-size: 16px;">✓</span>
                    <span>${h}</span>
                  </div>
                `).join('') || ''}
              </div>
              ${versionInfo?.breaking?.length > 0 ? `
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 12px; margin-top: 12px;">
                  <div style="color: #ef4444; font-size: 13px; font-weight: 600; margin-bottom: 8px;">⚠️ Breaking Changes</div>
                  <div style="color: rgba(255, 255, 255, 0.7); font-size: 13px; line-height: 1.5;">
                    ${versionInfo.breaking.map(b => `<div>• ${b}</div>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Roadmap -->
          ${roadmap.length > 0 ? `
            <div class="version-section">
              <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
                🗺️ 로드맵
              </h3>
              ${roadmap.map(item => `
                <div class="version-card roadmap-item ${item.status}">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                      <span class="version-badge ${item.status}">${item.version}</span>
                      <div style="color: white; font-size: 16px; font-weight: 600; margin-top: 8px;">
                        ${item.name}
                      </div>
                    </div>
                    <span class="status-badge ${item.status}">
                      ${item.status === 'in_progress' ? '🚧 진행중' : item.status === 'planned' ? '📋 예정' : '💭 구상'}
                    </span>
                  </div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 12px;">
                    출시 예정: ${item.eta}
                  </div>
                  <div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; line-height: 1.6;">
                    ${item.features.map(f => `<div style="margin-bottom: 4px;">• ${f}</div>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Quick Links -->
          <div class="version-section">
            <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
              📚 자료
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
              <a href="/ggp-academy/CHANGELOG.md" target="_blank" class="quick-link">
                📋 변경 내역
              </a>
              <a href="${this.versionData?.links?.github || '#'}" target="_blank" class="quick-link">
                💻 GitHub
              </a>
              <a href="${this.versionData?.links?.docs || '#'}" target="_blank" class="quick-link">
                📖 문서
              </a>
              <button onclick="window.versionManager.showAllVersions()" class="quick-link" style="border: none; cursor: pointer;">
                🕐 전체 버전
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        .version-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .version-modal {
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.98) 0%, rgba(39, 39, 42, 0.98) 100%);
          border: 1px solid rgba(63, 63, 70, 0.5);
          border-radius: 24px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        .version-modal-header {
          padding: 32px;
          border-bottom: 1px solid rgba(63, 63, 70, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: start;
        }

        .version-modal-body {
          padding: 32px;
          overflow-y: auto;
        }

        .version-section {
          margin-bottom: 32px;
        }

        .version-section:last-child {
          margin-bottom: 0;
        }

        .version-card {
          background: rgba(39, 39, 42, 0.6);
          border: 1px solid rgba(63, 63, 70, 0.4);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .version-card:last-child {
          margin-bottom: 0;
        }

        .version-card.current-version {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.1);
        }

        .version-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Monaco', 'Courier New', monospace;
        }

        .version-badge.current {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .version-badge.in_progress {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .version-badge.planned {
          background: rgba(168, 85, 247, 0.2);
          color: #a855f7;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.in_progress {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        .status-badge.planned {
          background: rgba(168, 85, 247, 0.2);
          color: #a855f7;
        }

        .modal-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          color: white;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .quick-link {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 16px;
          color: #3b82f6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .quick-link:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
    `;

    document.body.appendChild(modal);

    // ESC 키로 닫기
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.closeVersionModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // 오버레이 클릭으로 닫기
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeVersionModal();
      }
    });
  }

  closeVersionModal() {
    const modal = document.querySelector('.version-modal-overlay');
    if (modal) {
      modal.style.animation = 'fadeOut 0.2s ease';
      setTimeout(() => modal.remove(), 200);
    }
  }

  compareVersions(fromVersion, toVersion) {
    this.closeWhatsNew();

    const fromInfo = this.getVersionInfo(fromVersion);
    const toInfo = this.getVersionInfo(toVersion);

    const modal = document.createElement('div');
    modal.className = 'version-modal-overlay';
    modal.innerHTML = `
      <div class="version-modal">
        <div class="version-modal-header">
          <div>
            <h2 style="color: white; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
              🔄 버전 비교
            </h2>
            <div style="display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.7); font-size: 14px;">
              <span>v${fromVersion}</span>
              <span>→</span>
              <span>v${toVersion}</span>
            </div>
          </div>
          <button onclick="window.versionManager.closeVersionModal()" class="modal-close-btn">×</button>
        </div>

        <div class="version-modal-body">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- From Version -->
            <div>
              <div class="version-badge" style="margin-bottom: 16px;">v${fromVersion}</div>
              <div class="version-card">
                <h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                  ${fromInfo?.name || 'Previous Version'}
                </h4>
                <div style="color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 12px;">
                  ${fromInfo?.released || ''}
                </div>
                <div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; line-height: 1.6;">
                  ${fromInfo?.highlights.map(h => `<div style="margin-bottom: 6px;">• ${h}</div>`).join('') || ''}
                </div>
              </div>
            </div>

            <!-- To Version -->
            <div>
              <div class="version-badge current" style="margin-bottom: 16px;">v${toVersion}</div>
              <div class="version-card current-version">
                <h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                  ${toInfo?.name || 'Current Version'}
                </h4>
                <div style="color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 12px;">
                  ${toInfo?.released || ''}
                </div>
                <div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; line-height: 1.6;">
                  ${toInfo?.highlights.map(h => `
                    <div style="display: flex; align-items: start; gap: 8px; margin-bottom: 6px;">
                      <span style="color: #10b981;">✓</span>
                      <span>${h}</span>
                    </div>
                  `).join('') || ''}
                </div>
              </div>
            </div>
          </div>

          ${toInfo?.breaking?.length > 0 ? `
            <div style="margin-top: 24px;">
              <h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                ⚠️ 주요 변경사항
              </h4>
              <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px;">
                <div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; line-height: 1.6;">
                  ${toInfo.breaking.map(b => `<div style="margin-bottom: 6px;">• ${b}</div>`).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button onclick="window.open('/ggp-academy/CHANGELOG.md', '_blank')" class="quick-link" style="flex: 1; border: none; cursor: pointer;">
              📋 전체 변경사항 보기
            </button>
            <button onclick="window.versionManager.closeVersionModal()" class="quick-link" style="flex: 1; border: none; cursor: pointer; background: rgba(255, 255, 255, 0.1); color: white;">
              닫기
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeVersionModal();
      }
    });
  }

  showAllVersions() {
    const versions = this.versionData?.versions || [];

    const modal = document.createElement('div');
    modal.className = 'version-modal-overlay';
    modal.innerHTML = `
      <div class="version-modal">
        <div class="version-modal-header">
          <div>
            <h2 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">
              🕐 전체 버전 히스토리
            </h2>
          </div>
          <button onclick="window.versionManager.closeVersionModal()" class="modal-close-btn">×</button>
        </div>

        <div class="version-modal-body">
          <div style="position: relative; padding-left: 32px;">
            ${versions.map((v, idx) => `
              <div style="position: relative; margin-bottom: 32px;">
                <!-- Timeline dot -->
                <div style="
                  position: absolute;
                  left: -39px;
                  top: 8px;
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: ${idx === 0 ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)'};
                  border: 3px solid ${idx === 0 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
                "></div>

                <!-- Timeline line -->
                ${idx < versions.length - 1 ? `
                  <div style="
                    position: absolute;
                    left: -33px;
                    top: 22px;
                    width: 2px;
                    height: calc(100% + 32px);
                    background: rgba(255, 255, 255, 0.1);
                  "></div>
                ` : ''}

                <div class="version-card ${idx === 0 ? 'current-version' : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                      <span class="version-badge ${idx === 0 ? 'current' : ''}">${v.version}</span>
                      ${idx === 0 ? '<span style="margin-left: 8px; color: #10b981; font-size: 12px; font-weight: 600;">● CURRENT</span>' : ''}
                    </div>
                    <span style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">${v.released}</span>
                  </div>

                  <h4 style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
                    ${v.name}
                  </h4>

                  <div style="color: rgba(255, 255, 255, 0.8); font-size: 13px; line-height: 1.6;">
                    ${v.highlights.map(h => `<div style="margin-bottom: 4px;">• ${h}</div>`).join('')}
                  </div>

                  ${v.breaking?.length > 0 ? `
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                      <div style="color: #ef4444; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Breaking Changes</div>
                      <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">
                        ${v.breaking.map(b => `<div>• ${b}</div>`).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // 기존 모달 닫고 새로운 모달 열기
    this.closeVersionModal();
    setTimeout(() => {
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeVersionModal();
        }
      });
    }, 250);
  }

  // 헤더에 버전 배지 추가
  renderVersionBadge() {
    const currentVersion = this.getCurrentVersion();
    return `
      <button
        onclick="window.versionManager.openVersionModal()"
        class="version-badge-btn"
        style="
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          padding: 6px 12px;
          color: #3b82f6;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Monaco', 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        "
        onmouseover="this.style.background='rgba(59, 130, 246, 0.25)'"
        onmouseout="this.style.background='rgba(59, 130, 246, 0.15)'"
      >
        <span>v${currentVersion}</span>
        ${this.hasNewFeatures() ? '<span style="font-size: 16px;">🆕</span>' : ''}
      </button>
    `;
  }

  hasNewFeatures() {
    // 7일 이내에 릴리스된 버전이면 NEW 표시
    const currentVersion = this.getVersionInfo(this.getCurrentVersion());
    if (!currentVersion?.released) return false;

    const releaseDate = new Date(currentVersion.released);
    const now = new Date();
    const daysSinceRelease = (now - releaseDate) / (1000 * 60 * 60 * 24);

    return daysSinceRelease < 7;
  }
}

// 전역 인스턴스 생성
window.versionManager = new VersionManager();

// Fade out 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
