import { FlatList, Text, View } from "react-native";
import {styled} from "@gluestack-style/react"
import {Spinner} from "@gluestack-ui/themed"
import useGetBalance from "@/hooks/useGetBalance";
import { entityMaster } from "@/utils/constant";
import CardBalance from "../CardBalance";

const WalletMasterBalance = () => {
	const { balance, loading, error } = useGetBalance(entityMaster);
	return(
		<Container>
			{loading && <Spinner size={"small"} />}
			{error && <Text>Error: {error.message}</Text>}
			<FlatList
				showsVerticalScrollIndicator={false}
				data={balance}
				renderItem={({ item }) => (
					<CardBalance {...item} />
				)}
				keyExtractor={(item) => item.paymentMethodReference}
			/>
		</Container>
	)
}

const Container = styled(View, {
	display: "flex",
	flex: 1,
	width: "$full",
	flexDirection: "column",
	m: "$5",
	p: "$5",
	bg: "$backgroundLight150",
	rounded: "$xl",
	borderWidth: "$1",
	borderColor: "$borderLight300",
})

export default WalletMasterBalance