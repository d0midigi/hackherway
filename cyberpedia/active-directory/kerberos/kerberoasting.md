---
layout: editorial
title: Kerberoasting
permalink: /encyclopedia/active-directory/kerberos/kerberoasting/
---

## Kerberoasting

Kerberoasting is an attack technique that abuses service account SPNs
to extract Kerberos service tickets for offline password cracking.

### Attack Surface
- Service accounts
- Weak passwords
- Kerberos ticket granting

### Detection
- Abnormal TGS requests
- Service account authentication anomalies

### Mitigation
- Strong service account passwords
- Managed Service Accounts
