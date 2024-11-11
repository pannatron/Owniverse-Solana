import * as anchor from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Keypair, PublicKey } from '@solana/web3.js';
import { OwniverseCore } from "../target/types/owniverse_core";

describe('Transfer Tokens', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.OwniverseCore as anchor.Program<OwniverseCore>;

  const metadata = {
    name: 'BOROT',
    symbol: 'BOROT',
    uri: 'https://raw.githubusercontent.com/pannatron/Owniverse-Solana/refs/heads/main/.asset/owniverse.json',
  };

  // Generate new keypair to use as address for mint account.
  const mintKeypair = new Keypair();

  // ใช้ PublicKey ของผู้รับที่ต้องการ
  const recipientPublicKey = new PublicKey("S4DDsQjAwV2f9fGPNcbAQWPcQJP2GQT1VGrA5MK9Myq");

  // Derive the associated token address account for the mint and payer.
  const senderTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, payer.publicKey);

  // Derive the associated token address account for the mint and recipient.
  const recipientTokenAddress = getAssociatedTokenAddressSync(mintKeypair.publicKey, recipientPublicKey);

  it('Create an SPL Token!', async () => {
    const transactionSignature = await program.methods
      .createToken(metadata.name, metadata.symbol, metadata.uri)
      .accounts({
        payer: payer.publicKey,
        mintAccount: mintKeypair.publicKey,
      })
      .signers([mintKeypair])
      .rpc();

    console.log('Success!');
    console.log(`   Mint Address: ${mintKeypair.publicKey}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Mint tokens!', async () => {
    // Amount of tokens to mint.
    const amount = new anchor.BN(1000000);

    // Mint the tokens to the associated token account.
    const transactionSignature = await program.methods
      .mintToken(amount)
      .accounts({
        mintAuthority: payer.publicKey,
        recipient: payer.publicKey,
        mintAccount: mintKeypair.publicKey,
        associatedTokenAccount: senderTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Associated Token Account Address: ${senderTokenAddress}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });

  it('Transfer tokens!', async () => {
    // Amount of tokens to transfer.
    const amount = new anchor.BN(1000000);

    const transactionSignature = await program.methods
      .transferTokens(amount)
      .accounts({
        sender: payer.publicKey,
        recipient: recipientPublicKey,
        mintAccount: mintKeypair.publicKey,
        senderTokenAccount: senderTokenAddress,
        recipientTokenAccount: recipientTokenAddress,
      })
      .rpc();

    console.log('Success!');
    console.log(`   Transaction Signature: ${transactionSignature}`);
  });
});
