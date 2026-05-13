<script setup>
import { useUIStore } from '@/stores/uiStore'
import { useShowsStore } from '@/stores/useShowsStore'

import { useRoute } from 'vue-router'

// ── Stores & Route ───────────────────────────────────────────────────────────
const ui     = useUIStore()
const shows  = useShowsStore()
const route  = useRoute()

// ── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { name: 'home',       label: 'Discover'       },
  { name: 'my-list',    label: 'My List'         },
  { name: 'top-rated',  label: 'Top Rated'       },
  { name: 'trending',   label: 'New & Trending'  },
]

// ── Notifications ────────────────────────────────────────────────────────────
// hasNotifications drives the red dot on the bell icon
// Replace with real notification logic when ready
const hasNotifications = true
</script>

<template>
  <nav class="navbar navbar-expand-lg app-navbar">
    <div class="container-fluid px-4">

      <!-- ── Logo ─────────────────────────────────────────────────────── -->
      <RouterLink :to="{ name: 'home' }" class="navbar-brand logo">
        TV<span class="logo-dot">·</span>SHOWS
      </RouterLink>

      <!-- ── Mobile toggler ────────────────────────────────────────────── -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#appNav"
        aria-controls="appNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="toggler-icon">&#9776;</span>
      </button>

      <!-- ── Collapsible area ──────────────────────────────────────────── -->
      <div class="collapse navbar-collapse" id="appNav">

        <!-- Nav links -->
        <ul class="navbar-nav me-auto ms-4 gap-1">
          <li class="nav-item" v-for="link in navLinks" :key="link.name">
            <RouterLink
              :to="{ name: link.name }"
              class="nav-link"
              :class="{ active: $route.name === link.name }"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- ── Right side: Avatar ────────────────────────────────────── -->
        <div class="d-flex align-items-center gap-3">

          <!-- Notification bell -->
          <!-- <button
            class="icon-btn position-relative"
            aria-label="Notifications"
            @click="ui.markNotificationsRead()"
          >
            <i class="ti ti-bell"></i>
            <span v-if="hasNotifications" class="notif-dot position-absolute"></span>
          </button> -->

          <!-- Avatar dropdown -->
          <div class="dropdown">
            <button
              class="avatar-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :aria-label="`User menu for ${ui.user.name}`"
            >
              {{ ui.user.initials }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <span class="dropdown-item-text user-name">{{ ui.user.name }}</span>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <RouterLink :to="{ name: 'my-list' }" class="dropdown-item">
                  My List
                  <span v-if="shows.myList.length" class="ms-1 badge-count">
                    {{ shows.myList.length }}
                  </span>
                </RouterLink>
              </li>
              <li>
                <a href="#" class="dropdown-item">Settings</a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a href="#" class="dropdown-item item-signout">Sign out</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* ── Design tokens ────────────────────────────────────────────────────────── */
.app-navbar {
  --nav-bg:         #16161a;
  --nav-border:     rgba(255, 255, 255, 0.07);
  --nav-text:       #f0ede8;
  --nav-muted:      rgba(240, 237, 232, 0.45);
  --nav-accent:     #e8c46a;
  --nav-accent2:    #c45c3a;
  --nav-accent-bg:  rgba(232, 196, 106, 0.12);
  --nav-surface:    #1e1e24;

  background: var(--nav-bg);
  border-bottom: 0.5px solid var(--nav-border);
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 1030;
}

/* ── Logo ─────────────────────────────────────────────────────────────────── */
.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 2.5px;
  color: var(--nav-accent) !important;
  text-decoration: none;
  line-height: 1;
}

.logo-dot {
  color: var(--nav-accent2);
  font-size: 28px;
  line-height: 0.7;
}

/* ── Mobile toggler ───────────────────────────────────────────────────────── */
.navbar-toggler {
  border: 0.5px solid var(--nav-border);
  border-radius: 6px;
  padding: 4px 10px;
  background: var(--nav-surface);
}

.navbar-toggler:focus {
  box-shadow: none;
}

.toggler-icon {
  color: var(--nav-muted);
  font-size: 18px;
}

/* ── Nav links ────────────────────────────────────────────────────────────── */
.nav-link {
  font-size: 13px;
  font-weight: 400;
  color: var(--nav-muted) !important;
  border-radius: 6px;
  padding: 6px 12px !important;
  letter-spacing: 0.2px;
  transition: color 0.15s, background 0.15s;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--nav-text) !important;
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: var(--nav-accent) !important;
  background: var(--nav-accent-bg);
}

/* ── Icon button (bell) ───────────────────────────────────────────────────── */
.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 0.5px solid var(--nav-border);
  background: var(--nav-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--nav-muted);
  font-size: 18px;
  transition: color 0.15s, border-color 0.15s;
}

.icon-btn:hover {
  color: var(--nav-text);
  border-color: rgba(255, 255, 255, 0.18);
}

.notif-dot {
  width: 7px;
  height: 7px;
  background: var(--nav-accent2);
  border-radius: 50%;
  top: 6px;
  right: 6px;
}

/* ── Avatar button ────────────────────────────────────────────────────────── */
.avatar-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--nav-accent-bg);
  border: 1.5px solid rgba(232, 196, 106, 0.35);
  color: var(--nav-accent);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: border-color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-btn:hover {
  border-color: var(--nav-accent);
}

/* ── Dropdown menu ────────────────────────────────────────────────────────── */
.dropdown-menu {
  background: var(--nav-surface);
  border: 0.5px solid var(--nav-border);
  border-radius: 10px;
  padding: 6px;
  min-width: 180px;
  margin-top: 8px !important;
}

.user-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--nav-text);
  padding: 6px 10px;
  display: block;
}

.dropdown-item {
  font-size: 13px;
  color: var(--nav-muted);
  border-radius: 6px;
  padding: 7px 10px;
  transition: background 0.12s, color 0.12s;
  text-decoration: none;
  display: block;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--nav-text);
}

.item-signout {
  color: var(--nav-accent2);
}

.item-signout:hover {
  background: rgba(196, 92, 58, 0.12);
  color: var(--nav-accent2);
}

.dropdown-divider {
  border-color: var(--nav-border);
  margin: 4px 0;
}

/* ── My List count badge ──────────────────────────────────────────────────── */
.badge-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--nav-accent-bg);
  color: var(--nav-accent);
  font-size: 10px;
  font-weight: 500;
  border: 0.5px solid rgba(232, 196, 106, 0.3);
}

/* ── Mobile collapse ──────────────────────────────────────────────────────── */
@media (max-width: 991px) {
  .navbar-collapse {
    background: var(--nav-bg);
    border-top: 0.5px solid var(--nav-border);
    padding: 12px 0;
    margin-top: 8px;
  }

  .nav-link {
    padding: 10px 16px !important;
  }

  .d-flex.align-items-center {
    padding: 10px 16px;
  }
}
</style>