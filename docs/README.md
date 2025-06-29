**@useactio/sdk**

***

# @useactio/sdk

This is the official SDK for interacting with the Actio Protocol — a secure action code system for signing and submitting transactions on Solana using human-readable one-time codes.

---

## ✨ Features

- 🔐 Secure, server-signed Action Codes
- 🔁 Task-based status tracking
- 🔎 Memo parsing and trust validation (AIP-1 compliant)
- ⚛️ React-friendly hooks (optional)
- 🧪 Lightweight and extensible TypeScript client

---

## 📦 Installation

```bash
npm install @useactio/sdk
```

---

## 🛠️ Usage

### Basic Example

```ts
import { ActionCodesClient } from '@useactio/sdk';

const client = new ActionCodesClient();

// Example: Submit a transaction with an action code and wait for completion
async function submitAndTrack() {
  const code = '12345678'; // 8-digit action code
  const transactionBase64 = '...'; // Your Solana transaction, base64-encoded

  // Submit the action and wait for the result
  const result = await client.submitAndWait(code, {
    transactionBase64,
    label: 'My App',
    message: 'Payment for order #123',
    logo: 'https://merchant.site/logo.png',
  });

  console.log('Task result:', result);
}

// Example: Track task status updates (advanced)
async function trackTask(taskId: string) {
  for await (const task of client.observeTaskStatus(taskId)) {
    console.log('Task status:', task.status);
    if (task.status === 'completed') {
      // Optionally fetch the final result
      const final = await client.getTaskResult(taskId);
      console.log('Final result:', final);
    }
  }
}
```

---

## 🧬 Protocol Overview

Actio Protocol enables secure, intent-driven transactions on Solana using human-readable codes. Each Action Code represents a verifiable intent, tracked via task-based infrastructure and enforced on-chain through memo metadata.

### Current AIPs
- **AIP-1:** Memo Format Specification (trust, issuers, recipients)
- **AIP-2:** Authority Signature Validation ✅ implemented
- **AIP-3:** Intent Resolution & Routing ✅ implemented
- **AIP-4 (coming soon):** Custom Code Prefix Registry & On-Chain Metadata Verification

The protocol is designed to support seamless blockchain transaction flows with built-in trust and simplicity.

---

## 📄 Protocol Compliance

This SDK follows the Actio Protocol specs defined in the [Protocol Docs](https://github.com/useactio/protocol).

Includes:
- ✅ AIP-1: Action Code Memo Format
- 🛡 Memo signature verification
- 🧾 Support for prefix registry `.well-known` files

---

## 📚 Internal Docs

- [Protocol Specifications (AIPs)](https://github.com/useactio/protocol)
- [SDK API Reference (WIP)](https://github.com/useactio/sdk/docs)
- [React Hooks](https://github.com/useactio/sdk/tree/main/packages/react)

---

## 🌐 Actio Ecosystem

- **Main product:** [https://actio.click](https://actio.click)  
  Actio universal checkout experience for entities and users.

- **Code generator:** [https://useactio.codes](https://useactio.codes)  
  Generate one-time codes directly from any wallet browser.

- **Protocol and SDK Docs:** [https://docs.useactio.codes](https://docs.useactio.codes) *(coming soon)*  
  Will include protocol specs, SDK API reference, and REST API usage.  
  Until then, see GitHub Markdown docs at `/docs` in this repo.

---

## 📝 License

Apache-2.0 © Actio Inc.
