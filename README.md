# Owniverse-Solana
"Owniverse-Solana" integrates Solana into the OWNiverse platform, enabling users to create and manage tokens on Solana with ease. This module combines Solana's fast, low-cost transactions with OWNiverse’s user-friendly design, making blockchain accessible to everyone.

## Getting Started

To set up the development environment for Solana, follow these steps:

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Git
- Rust (for Solana program development)
- Solana CLI
- Anchor Framework (optional but recommended)

### Installation Guide

1. **Install Node.js and npm/yarn**:
   Ensure Node.js is installed. You can download it [here](https://nodejs.org/). Verify installation with:
```bash
   node -v
   npm -v
   ```
2. **Install Rust: Rust is required for building smart contracts on Solana.**
  ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh source $HOME/.cargo/env
  ```
3. **Install Solana CLI: Download and install the Solana CLI tool.**
 ```bash
 sh -c "$(curl -sSfL https://release.solana.com/v1.18.26/install)"
  ```
 After installation, run the following command to apply the PATH changes without restarting your terminal:

 ```bash
 export PATH="/Users/your-username/.local/share/solana/install/active_release/bin:$PATH"
  ```
 Verify installation:
 ```bash
solana --version
```
4. **Configure Solana CLI to use Devnet**:
 ```bash
solana config set --url https://api.devnet.solana.com
```
5. **Install Anchor Framework (Optional): Anchor simplifies the development of Solana programs.**
 ```bash

cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

```
6. **Clone the Repository: Clone the repository to start developing.**
 ```bash
git clone https://github.com/pannatron/Owniverse-Solana.git
cd Owniverse-Solana
```



