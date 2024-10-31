import { Link, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, HStack, Icon } from "@gluestack-ui/themed";
import { styled } from "@gluestack-style/react"
import CardsList from "@/components/Cards";
import { SafeAreaViewWrapper } from "@/components/SafeAreaViewWrapper";
import { Text } from "react-native";

export default function WalletDetailScreen() {
	const { id,alias } = useLocalSearchParams();

	return(
		<SafeAreaViewWrapper>
			<HStack
				justifyContent="flex-start"
				w={"$full"}
				alignItems="center"
				mb={"$4"}
			>
				<Link href="/">
					<Icon as={ArrowLeftIcon} color="$white" />
				</Link>
				<Title>
					{alias}
				</Title>
			</HStack>
			<CardsList entityId={id as string} />
		</SafeAreaViewWrapper>
	)
}

const Title = styled(Text,{
	ml:"$4",
	fontSize: "$lg",
	fontWeight: "$bold",
	color: "$black",
	_dark: {
		color: "$white"
	}
})