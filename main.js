
const app = document.getElementById('app');

const state = {
  step: 'landing',
  gender: null,
  selectedRoles: [],
  isConnecting: false,
  suggestionAccepted: false,
  isHealthSynced: false,
  isCalendarSynced: false,
  allRoles: [
    { id: 'mother', icon: 'baby', title: 'The Mother', desc: "Ava's health, school, & activities" },
    { id: 'ceo', icon: 'briefcase', title: 'The CEO', desc: 'Company sync & VN staff coordination' },
    { id: 'daughter', icon: 'users', title: 'The Daughter', desc: "Parents' health & medical alerts" },
    { id: 'individual', icon: 'heart', title: 'Self Care', desc: 'Personal health, fitness, & schedule' },
  ],
  isModalOpen: false,
  newRoleName: '',
  newRoleDesc: '',
};

function render() {

  // Render navigation
  const nav = document.querySelector('nav') || document.createElement('nav');
  nav.className = "navigation";
  if (state.step === 'landing') {
    nav.innerHTML = `
      <div class="logo" id="home-btn">
        <div class="logo-icon">
          <i data-lucide="shield-check"></i>
        </div>
        ORCHESTRA
      </div>
      <div class="nav-links">
        <button id="pricing-btn">Pricing</button>
        <button id="start-free-btn" class="primary-btn">Start Free</button>
      </div>
    `;
  } else {
    nav.innerHTML = `
      <div class="logo" id="home-btn">
        <div class="logo-icon">
          <i data-lucide="shield-check"></i>
        </div>
        ORCHESTRA
      </div>
      <div class="nav-links">
         <div class="tier-badge">
           <i data-lucide="activity"></i>
           Tier: Executive
         </div>
      </div>
    `;
  }
  if (!document.querySelector('nav')) {
    document.body.prepend(nav);
  }

  switch (state.step) {
    case 'landing':
      app.innerHTML = `
        <div class="hero">
            <div class="hero-icon">
              <i data-lucide="shield-check"></i>
            </div>
            <h1>
              Your Life, <br/><span class="highlight">Orchestrated.</span>
            </h1>
            <p class="subtitle">
              The first AI agent designed for high-context lives. One PA to manage your family, business, and self across every role.
            </p>
            <div class="button-group">
              <button 
                id="start-journey-btn"
                class="primary-btn with-icon"
              >
                Start Journey <i data-lucide="arrow-right"></i>
              </button>
              <button id="view-plans-btn" class="secondary-btn">
                View Subscription Plans
              </button>
            </div>
            <p class="encryption-note">
              <i data-lucide="lock"></i> End-to-end encrypted life management
            </p>
          </div>
      `;
      break;
    case 'login':
      app.innerHTML = `
        <div class="form-container">
          <h2>Identify</h2>
          <p>Securely connect to your life data.</p>
          
          <div class="login-options">
            <button class="social-btn" data-step="gender">
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              <span>Continue with Google</span>
            </button>
            <button class="social-btn" data-step="gender">
              <img src="https://www.apple.com/favicon.ico" alt="Apple" />
              <span>Continue with Apple</span>
            </button>
            <div class="divider">Secure Email</div>
            <input type="email" placeholder="Email address" />
            <button class="primary-btn" data-step="gender">Sign In</button>
          </div>
        </div>
      `;
      break;
    case 'gender':
      app.innerHTML = `
        <div class="form-container text-center">
          <h2>Persona</h2>
          <p>Helps AI adjust tone and physiological tracking parameters.</p>
          <div class="gender-options">
            ${['Female', 'Male', 'Non-binary', 'Prefer not to say'].map(g => `
              <button 
                class="gender-btn" 
                data-gender="${g}" data-step="roles">
                <span>${g}</span>
                <i data-lucide="chevron-right"></i>
              </button>
            `).join('')}
          </div>
        </div>
      `;
      break;
      case 'roles':
        app.innerHTML = `
          <div class="roles-container">
            <h2>Define Your Roles</h2>
            <p>Select or create the life segments you need AI to orchestrate.</p>
            
            <div class="roles-grid">
              ${state.allRoles.map(role => `
                <div 
                  class="role-card ${state.selectedRoles.includes(role.id) ? 'selected' : ''}"
                  data-role-id="${role.id}"
                >
                  ${state.selectedRoles.includes(role.id) ? '<div class="selected-icon"><i data-lucide="check-circle-2"></i></div>' : ''}
                  <div class="role-icon">
                    <i data-lucide="${role.icon}"></i>
                  </div>
                  <h3>${role.title}</h3>
                  <p>${role.desc}</p>
                </div>
              `).join('')}
              
              <div 
                id="add-custom-role-btn"
                class="add-role-card"
              >
                <i data-lucide="plus-circle"></i>
                <span>Add Custom Role</span>
              </div>
            </div>

            <button 
              id="activate-orchestrator-btn"
              class="primary-btn large-btn"
              ${state.selectedRoles.length === 0 || state.isConnecting ? 'disabled' : ''}
            >
              ${state.isConnecting ? '<i data-lucide="activity" class="spinner"></i> Orchestrating Agents...' : '<i data-lucide="zap"></i> Activate My Orchestrator'}
            </button>
          </div>
        `;
        break;
    case 'dashboard':
      app.innerHTML = `
        <div class="dashboard-container">
          <header>
            <div>
              <h1>
                Welcome back, ${state.gender === 'Female' ? 'Madam' : 'Director'}
              </h1>
              <div class="status-badge">
                <div class="status-dot"></div>
                <p>Orchestrator Active</p>
              </div>
            </div>
            <div class="header-actions">
              <button><i data-lucide="search"></i></button>
              <button><i data-lucide="settings"></i></button>
              <div class="profile-icon">
                <i data-lucide="user-circle-2"></i>
              </div>
            </div>
          </header>

          <!-- Smart Summary Card -->
          <div class="summary-card">
            <div>
              <h3>
                <i data-lucide="shield-check"></i> Daily Executive Briefing
              </h3>
              <span>Synced: Now</span>
            </div>
            <p>
              "Today is fully synchronized. I identified a <span class="highlight-text">time conflict</span> at 2:00 PM. I moved your Sync and notified your Vietnam staff to handle the recording. Ava's clinic check-in is secured."
            </p>
            <div class="summary-actions">
                <button data-step="ava-schedule"><i data-lucide="calendar"></i> View Ava's Schedule</button>
                <button data-step="vn-staff-logs"><i data-lucide="message-square"></i> Review Zalo/VN Sync</button>
                <button data-step="parents-health"><i data-lucide="heart"></i> Parents' Health Portal</button>
                <button data-step="individual-health" class="primary"><i data-lucide="activity"></i> Self-Care & Fitness</button>
            </div>
            <div class="background-glow"></div>
          </div>

          <div class="dashboard-grid">
              <!-- Autonomous Actions -->
              <div class="widget-card">
                <div class="widget-header">
                  <div class="widget-title">
                    <div class="widget-icon"><i data-lucide="zap"></i></div>
                    <h4>Autonomous Actions</h4>
                  </div>
                  <span>Live</span>
                </div>
                <ul>
                  <li>
                    <div class="action-icon"><i data-lucide="check-circle-2"></i></div>
                    <div>
                      <p>Hospital Portal Sync</p>
                      <p>Cross-referenced Ava's patient ID with clinical calendar. No manual action required.</p>
                    </div>
                  </li>
                  <li>
                    <div class="action-icon warning"><i data-lucide="message-square"></i></div>
                    <div>
                      <p>VN Staff Coordination</p>
                      <p>Automated Zalo update sent to HR leads regarding your 2:00 PM role transition.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Agent Cross-Talk Console -->
              <div class="widget-card dark">
                <div class="widget-header">
                  <div class="widget-title">
                    <div class="widget-icon"><i data-lucide="database"></i></div>
                    <h4>Agent Cross-Talk</h4>
                  </div>
                </div>
                <div class="console">
                  <div class="console-line"><span class="ceo-agent">[CEO-Agent]</span> &gt; Conflict at 14:00. Requesting priority override...</div>
                  <div class="console-line mother-agent-dim"><span>[Mother-Agent]</span> &gt; Priority granted. Ava's medical appt locked.</div>
                  <div class="console-line"><span class="ceo-agent">[CEO-Agent]</span> &gt; Drafting Zalo automated report for Vietnam team...</div>
                  <div class="console-line"><span class="mother-agent">[Mother-Agent]</span> &gt; Syncing father's HL7 health records... Success.</div>
                </div>
                <div class="console-fade"></div>
                <button>Expand Logic Log</button>
              </div>
            </div>
        </div>
      `;
      break;
      case 'ava-schedule':
        app.innerHTML = `
          <div class="detail-view-container">
            <button 
              data-step="dashboard"
              class="back-btn">
              <i data-lucide="chevron-left"></i> Back to Dashboard
            </button>

            <div class="detail-header">
              <div>
                <h2>
                  Ava's Daily Schedule <i data-lucide="baby"></i>
                </h2>
                <p>Thursday, Feb 12th, 2026</p>
              </div>
              <div class="status-badge active">
                <i data-lucide="check-circle-2"></i> Mother Agent Monitoring Active
              </div>
            </div>

            <div class="timeline">
              <!-- Timeline Entry 1 -->
              <div class="timeline-entry">
                <div class="timeline-time">
                  <span>08:30</span>
                  <div class="timeline-line"></div>
                </div>
                <div class="timeline-content">
                  <h4>School Drop-off</h4>
                  <div class="timeline-meta">
                    <span><i data-lucide="map-pin"></i> International Primary</span>
                    <span class="completed"><i data-lucide="check-circle-2"></i> Completed</span>
                  </div>
                  <div class="ai-log">
                    <i data-lucide="zap"></i>
                    <span>AI Auto-Log: Drop-off confirmed via geofence.</span>
                  </div>
                </div>
              </div>

              <!-- Timeline Entry 2 - HIGHLIGHTED -->
              <div class="timeline-entry highlighted">
                <div class="timeline-time">
                  <span class="highlight-time">14:00</span>
                  <div class="timeline-line"></div>
                </div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <div>
                      <h4>Pediatric Follow-up</h4>
                      <p class="highlight-subtitle">Conflict Resolved by PA</p>
                    </div>
                    <div class="timeline-icon">
                      <i data-lucide="clock"></i>
                    </div>
                  </div>
                  <div class="timeline-meta">
                    <span><i data-lucide="map-pin"></i> City Medical Center</span>
                    <span>Dr. Sarah Thompson</span>
                  </div>
                  
                  <!-- AI Intervention Details -->
                  <div class="ai-intervention">
                    <div>
                      <i data-lucide="zap"></i>
                      <div>
                        <p>AI Orchestration Log</p>
                        <p>
                          "I cross-referenced the Pediatric Portal. Your check-in is <span class="highlight-text">pre-authorized</span>. Transportation is booked for 13:30. I've sent the clinic route to your driver."
                        </p>
                      </div>
                    </div>
                    <div class="button-group">
                      <button class="primary-btn small-btn">View Portal <i data-lucide="external-link"></i></button>
                      <button class="secondary-btn small-btn">Message Clinic</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline Entry 3 -->
              <div class="timeline-entry faded">
                <div class="timeline-time">
                  <span>16:30</span>
                </div>
                <div class="timeline-content">
                  <h4>Gymnastics Practice</h4>
                  <div class="timeline-meta">
                    <span><i data-lucide="map-pin"></i> Elite Sports Club</span>
                    <span class="italic">Upcoming</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- AI Insight Box -->
            <div class="insight-box">
              <div class="insight-icon">
                <i data-lucide="shield-check"></i>
              </div>
              <div class="insight-text">
                <h4>PA Security Insight</h4>
                <p>
                  "I am monitoring Ava's school portal for any emergency alerts. I have also verified your father's medication adherence—his 1:00 PM dose was logged as taken."
                </p>
              </div>
              <button>Mute Alerts</button>
            </div>
          </div>
        `;
        break;
      case 'vn-staff-logs':
        app.innerHTML = `
          <div class="detail-view-container">
            <button 
              data-step="dashboard"
              class="back-btn">
              <i data-lucide="chevron-left"></i> Back to Dashboard
            </button>

            <div class="detail-header">
              <div>
                <h2>
                  VN Staff Coordination <i data-lucide="briefcase"></i>
                </h2>
                <p>Autonomous Business Management via Zalo</p>
              </div>
              <div class="status-badge active primary">
                <i data-lucide="zap"></i> CEO-Agent Active
              </div>
            </div>

            <div class="zalo-view">
              <!-- Zalo Conversation Mockup -->
              <div class="zalo-chat">
                <div class="chat-header">
                  <div class="contact-info">
                    <div class="avatar">NH</div>
                    <div>
                      <p>Nguyen Hoang (VN Operations)</p>
                      <p>Online</p>
                    </div>
                  </div>
                  <div class="chat-actions">
                    <button><i data-lucide="phone"></i></button>
                    <button><i data-lucide="more-horizontal"></i></button>
                  </div>
                </div>

                <!-- Message Area -->
                <div class="message-area">
                    <div class="message sent">
                        <p>Hi Nguyen. Director is heading to a priority family medical appointment for Ava at 14:00. I have rescheduled the Weekly Sync to tomorrow 09:00 VN time.</p>
                        <span>13:45 • Sent by CEO-Agent</span>
                    </div>
                    <div class="message sent">
                        <p>Please proceed with the internal review without her. Ensure the session is recorded and the transcript is uploaded to our shared Drive. I will process the summary for her tonight.</p>
                        <span>13:46 • Sent by CEO-Agent</span>
                    </div>
                    <div class="message received">
                        <p>Understood. I'll inform the team. Hope everything is okay with Ava. I'll set up the recording now.</p>
                        <span>13:50 • Received</span>
                    </div>
                    <div class="message sent">
                        <p>Thank you, Nguyen. I've also updated the project timeline to reflect these changes.</p>
                        <span>13:52 • Sent by CEO-Agent</span>
                    </div>
                </div>

                <!-- Input Simulation -->
                <div class="chat-input">
                    <div>AI is managing this conversation...</div>
                    <button><i data-lucide="send"></i></button>
                </div>
              </div>

              <!-- Sidebar Logic/Status -->
              <div class="zalo-sidebar">
                <div class="sidebar-widget">
                  <h4>Autonomous Tasks</h4>
                  <ul>
                    <li><span>Zalo Notification</span><span class="completed">Completed</span></li>
                    <li><span>Calendar Conflict</span><span class="completed">Resolved</span></li>
                    <li><span>Recording Trigger</span><span class="monitoring">Monitoring</span></li>
                  </ul>
                </div>

                <div class="sidebar-widget dark">
                  <h4><i data-lucide="zap"></i> Decision Logic</h4>
                  <p>"Conflict detected: [Business Sync] vs [Medical Appt]. Rule: Family_Priority_High. Action: Postpone business, delegate recording, notify Lead via preferred channel (Zalo)."</p>
                </div>

                <div class="sidebar-widget light">
                  <h4>Staff Feedback</h4>
                  <p>"The team responded well to the automation. Nguyen has already initiated the Zoom recording."</p>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'parents-health':
        app.innerHTML = `
          <div class="detail-view-container">
             <button 
              data-step="dashboard"
              class="back-btn">
              <i data-lucide="chevron-left"></i> Back to Dashboard
            </button>

            <div class="detail-header">
              <div>
                <h2>
                  Parents' Health Portal <i data-lucide="users"></i>
                </h2>
                <p>Real-time health monitoring & HL7 Data Sync</p>
              </div>
              <div class="status-badge active secondary">
                <i data-lucide="shield-check"></i> Daughter Agent Syncing
              </div>
            </div>

            <div class="health-grid">
              <!-- Father's Profile -->
              <div class="health-card">
                <div class="profile-header">
                  <div class="avatar-large">JD</div>
                  <div>
                    <h3>Father (John)</h3>
                    <p class="status-stable">Stable</p>
                  </div>
                </div>

                <div class="vitals-grid">
                  <div class="vital-card">
                    <p><i data-lucide="heart"></i> Heart Rate</p>
                    <p>72 <span>BPM</span></p>
                  </div>
                  <div class="vital-card">
                    <p><i data-lucide="thermometer"></i> Temp</p>
                    <p>36.6 <span>°C</span></p>
                  </div>
                  <div class="vital-card large">
                    <p><i data-lucide="stethoscope"></i> Blood Pressure</p>
                    <p>120 / 80 <span>mmHg</span></p>
                  </div>
                </div>

                <div class="medication-card">
                  <h4>Medication Adherence</h4>
                  <div>
                    <span>Lisinopril (10mg)</span>
                    <span class="status-taken"><i data-lucide="check-circle-2"></i> Taken 1:00 PM</span>
                  </div>
                </div>
              </div>

              <!-- Mother's Profile -->
              <div class="health-card">
                <div class="profile-header">
                  <div class="avatar-large secondary">MD</div>
                  <div>
                    <h3>Mother (Mary)</h3>
                    <p>Monitoring Active</p>
                  </div>
                </div>

                <div class="vitals-grid">
                  <div class="vital-card">
                    <p><i data-lucide="heart"></i> Heart Rate</p>
                    <p>68 <span>BPM</span></p>
                  </div>
                  <div class="vital-card">
                    <p><i data-lucide="zap"></i> Activity</p>
                    <p>Light <span>Walk</span></p>
                  </div>
                  <div class="vital-card large">
                    <p><i data-lucide="calendar"></i> Next Screening</p>
                    <p>March 15th <span>Cardiology</span></p>
                  </div>
                </div>

                <div class="insight-card-small">
                  <p><i data-lucide="shield-check"></i> AI Insight</p>
                  "Mary's sleep quality improved by 12% last night. No irregular heart rhythms detected in the last 24h sync."
                </div>
              </div>
            </div>

            <!-- Emergency & Logic Log -->
            <div class="log-grid">
              <div class="log-card">
                <h4>Orchestrator Medical Logs</h4>
                <ul>
                  <li>
                    <div class="log-icon"><i data-lucide="database"></i></div>
                    <div>
                      <p>Synced: HL7 FHIR Hospital Portal</p>
                      <p>"Successfully extracted latest lab results for John. Creatinine levels are stable. No clinical intervention needed."</p>
                    </div>
                  </li>
                  <li>
                    <div class="log-icon"><i data-lucide="check-circle-2"></i></div>
                    <div>
                      <p>Verified: Smart Pill Dispenser</p>
                      <p>"Verified John's noon dosage via IoT bridge. Logged to Family Health Vault."</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="emergency-card">
                <div>
                  <div><i data-lucide="alert-circle"></i> Emergency</div>
                  <p>If vitals drop below threshold, I will automatically call the Family Clinic and alert your VN staff to handle your current role transitions.</p>
                </div>
                <button>Update Care Contacts</button>
              </div>
            </div>
          </div>
        `;
        break;
      case 'individual-health':
        app.innerHTML = `
          <div class="detail-view-container">
            <button 
              data-step="dashboard"
              class="back-btn">
              <i data-lucide="chevron-left"></i> Back to Dashboard
            </button>

            <div class="detail-header">
              <div>
                <h2>
                  Self-Care & Fitness <i data-lucide="heart"></i>
                </h2>
                <p>Managing your physical & mental recovery</p>
              </div>
              <div class="sync-buttons">
                ${!state.isHealthSynced ? `
                  <button 
                    id="apple-health-sync-btn"
                    class="primary-btn">
                    <i data-lucide="watch"></i> Sync Apple Health
                  </button>
                ` : `
                  <div class="status-badge active">
                    <i data-lucide="check-circle-2"></i> Apple Watch Connected
                  </div>
                `}
              </div>
            </div>

            <div class="health-metrics-grid">
              <div class="metric-card">
                <div>
                  <div><i data-lucide="moon"></i></div>
                  <span>Sleep Quality</span>
                </div>
                <div>
                  <p>88%</p>
                  <p>+12% from average</p>
                </div>
              </div>

              <div class="metric-card">
                <div>
                  <div><i data-lucide="droplets"></i></div>
                  <span>Hydration</span>
                </div>
                <div>
                  <p>1.8 <span>L</span></p>
                  <p>Target: 2.5L</p>
                </div>
              </div>

              <div class="metric-card">
                <div>
                  <div><i data-lucide="coffee"></i></div>
                  <span>Caffeine Intake</span>
                </div>
                <div>
                  <p>2 <span>Cups</span></p>
                  <p class="warning">Daily Limit Reached</p>
                </div>
              </div>
            </div>

            <div class="schedule-grid">
              <div class="schedule-card">
                <h4>Personal Schedule</h4>
                <ul>
                  ${state.suggestionAccepted ? `
                    <li class="suggestion-accepted">
                      <div>17:00</div>
                      <div>
                        <p>Guided Stretching <i data-lucide="sparkle"></i></p>
                        <p>"PA Optimized: cortisol reduction protocol active."</p>
                      </div>
                    </li>
                  ` : `
                    <li class="faded">
                      <div>17:00</div>
                      <div>
                        <p>HIIT Training (Cardio)</p>
                        <p>"AI Suggestion: Postpone due to high stress levels."</p>
                      </div>
                    </li>
                  `}
                  
                  <li>
                    <div>18:00</div>
                    <div>
                      <p>Evening Yoga (Vinyasa)</p>
                      <p>"I've pre-booked your mat at the Zen Studio. 15 mins commute confirmed."</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="suggestion-card ${state.suggestionAccepted ? 'accepted' : ''}">
                <div>
                  <div>
                    <i data-lucide="shield-check"></i> PA Recovery Protocol
                  </div>
                  
                  ${state.suggestionAccepted ? `
                    <div>
                      <h4>Suggestion Accepted</h4>
                      <p>"Brilliant choice. I have canceled your gym reservation and notified the stretching studio. Your cortisol levels should begin stabilizing before your evening sync."</p>
                      <div><i data-lucide="check-circle-2"></i> Optimizing Night Routine</div>
                    </div>
                  ` : `
                    <div>
                      <p>"Based on your 2:00 PM family stress levels and corporate coordination, I suggest skipping the 5:00 PM cardio. I've swapped it for a Guided Stretching session to ensure optimal cortisol reduction before sleep."</p>
                      <button id="accept-suggestion-btn">Accept Suggestion</button>
                    </div>
                  `}
                </div>
              </div>
            </div>
        </div>
        `;
        break;
  }

  lucide.createIcons();
}

// Event delegation for handling clicks on dynamically created elements
document.body.addEventListener('click', (e) => {
  let target = e.target;
  while (target && target !== document.body) {
    const step = target.dataset.step;
    const gender = target.dataset.gender;
    const roleId = target.dataset.roleId;

    if (step) {
      state.step = step;
      if (gender) {
        state.gender = gender;
      }
      render();
      return;
    }

    if (roleId) {
      if (state.selectedRoles.includes(roleId)) {
        state.selectedRoles = state.selectedRoles.filter(id => id !== roleId);
      } else {
        state.selectedRoles.push(roleId);
      }
      render();
      return;
    }

    switch (target.id) {
      case 'home-btn':
        state.step = 'landing';
        render();
        return;
      case 'pricing-btn':
        state.step = 'pricing'; // Note: pricing view not implemented
        render();
        return;
      case 'start-free-btn':
      case 'start-journey-btn':
        state.step = 'login';
        render();
        return;
      case 'activate-orchestrator-btn':
        state.isConnecting = true;
        render();
        setTimeout(() => {
          state.isConnecting = false;
          state.step = 'dashboard';
          render();
        }, 2000);
        return;
      case 'accept-suggestion-btn':
        state.suggestionAccepted = true;
        render();
        return;
      case 'apple-health-sync-btn':
          state.isHealthSynced = true;
          render();
          return;
      case 'add-custom-role-btn':
          // Will be implemented in the future
          return;
    }

    target = target.parentElement;
  }
});

render();
