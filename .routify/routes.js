
/**
 * @roxi/routify 2.18.8
 * File generated Wed Jan 03 2024 17:02:43 GMT+1100 (Australian Eastern Daylight Time)
 */

export const __version = "2.18.8"
export const __timestamp = "2024-01-03T06:02:43.776Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "ownMeta": {
    "preload": "proximity"
  },
  "children": [
    {
      "isFallback": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/_fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/addlinkeduser",
      "id": "_addlinkeduser",
      "component": () => import('../src/pages/addlinkeduser.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/adduser",
      "id": "_adduser",
      "component": () => import('../src/pages/adduser.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/brokerdash",
      "id": "_brokerdash",
      "component": () => import('../src/pages/brokerdash.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/brokeredit",
      "id": "_brokeredit",
      "component": () => import('../src/pages/brokeredit.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/brokerlogin",
      "id": "_brokerlogin",
      "component": () => import('../src/pages/brokerlogin.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/ExpiredPolicies",
      "id": "_ExpiredPolicies",
      "component": () => import('../src/pages/ExpiredPolicies.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/ListPolicies",
      "id": "_ListPolicies",
      "component": () => import('../src/pages/ListPolicies.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/Login",
      "id": "_Login",
      "component": () => import('../src/pages/Login.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/Pdf",
      "id": "_Pdf",
      "component": () => import('../src/pages/Pdf.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/updatepolicies",
      "id": "_updatepolicies",
      "component": () => import('../src/pages/updatepolicies.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/updateuser",
      "id": "_updateuser",
      "component": () => import('../src/pages/updateuser.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "meta": {
        "recursive": true,
        "preload": "proximity",
        "prerender": true
      },
      "path": "/UploadPolicy",
      "id": "_UploadPolicy",
      "component": () => import('../src/pages/UploadPolicy.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "meta": {
    "preload": "proximity",
    "recursive": true,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

