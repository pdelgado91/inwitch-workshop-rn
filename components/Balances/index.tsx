import { FlatList, Text, View, Switch } from "react-native";
import { styled } from "@gluestack-style/react"
import { Spinner } from "@gluestack-ui/themed"
import useGetBalance from "@/hooks/useGetBalance";
import { entityMaster } from "@/utils/constant";
import CardBalance from "../CardBalance";
import { useEffect, useState } from "react";

const WalletMasterBalance = () => {
	const [isCRCEnabled, setIsCRCEnabled] = useState(true);
	const [isUSDEnabled, setIsUSDEnabled] = useState(true);
	var { balance, loading, error, filterBalances } = useGetBalance(entityMaster);
	const toggleCRCSwitch = () => setIsCRCEnabled(previousState => !previousState);
	const toggleUSDSwitch = () => setIsUSDEnabled(previousState => !previousState);


	balance = filterBalances(balance, isCRCEnabled, "CRC");
	balance = filterBalances(balance, isUSDEnabled, "USD");

	return (
		<Container>
			{loading && <Spinner size={"small"} />}
			{error && <Text>Error: {error.message}</Text>}
			<Text>Mostrar Cuentas Colones</Text>
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={isCRCEnabled ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor="#3e3e3e"
				onChange={toggleCRCSwitch}
				value={isCRCEnabled}
			/>
			<Text>Mostrar Cuentas Dólares</Text>
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={isUSDEnabled ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor="#3e3e3e"
				onChange={toggleUSDSwitch}
				value={isUSDEnabled}
			/>
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
	alignItems: 'flex-start'
})

export default WalletMasterBalance