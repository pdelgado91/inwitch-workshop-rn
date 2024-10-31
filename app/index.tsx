import WalletMasterBalance from "@/components/Balances";
import MasterWalletEntity from "@/components/Entities";
import { SafeAreaViewWrapper } from "@/components/SafeAreaViewWrapper";


export default function Home() {
  return (
		<SafeAreaViewWrapper>
			<MasterWalletEntity />
			<WalletMasterBalance />
		</SafeAreaViewWrapper>
  );
}