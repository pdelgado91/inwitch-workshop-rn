import { styled } from "@gluestack-style/react"
import { View, Text } from "react-native"
import useCardBalance from "./useCardBalance"
import React from "react";
import { Button, ButtonText, HStack, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";

type TAmount = {
	amount: string;
	label: string;
}

type TBalance = {
	amounts: TAmount[];
	currency: string;
}

interface CardBalanceProps {
	balance: TBalance;
	paymentMethodAlias: string;
	paymentMethodReference: string;
	paymentMethodType: string;
	paymentMethodTypeClass: string;
	color: string;
}

const CardBalance: React.FC<CardBalanceProps> = (props) => {
	const {
		color,
		available,
		reserved,
		unsettled,
		currency,
		disputing,
		handleCopy,
		paymentMethodAlias,
		paymentMethodType,
		paymentMethodTypeClass,
		paymentMethodReference,
		copied
	} = useCardBalance<CardBalanceProps>(props)

	return (
		<CardBalanceContainer sx={{
			backgroundColor: color
		}}>
			<Link
				href={{
					pathname: '/wallet/[id]',
					params: { 
						id: paymentMethodReference,
						alias: paymentMethodAlias,
					},
				}}
			>
				<VStack>
					<Label>
						Alias:
						<Value>
							{` ${paymentMethodAlias}`}
						</Value>
					</Label>
					<Label>
						Tipo y clase:
						<Value>
							{` ${paymentMethodType} ${paymentMethodTypeClass}`}
						</Value>
					</Label>
					<Label>
						Disponible:
						<Value>
							{` ${available} ${currency}`}
						</Value>
					</Label>
					<Label>
						Reservado:
						<Value>
							{` ${reserved} ${currency}`}
						</Value>
					</Label>
					<Label>
						Por liquidar:
						<Value>
							{` ${unsettled} ${currency}`}
						</Value>
					</Label>
					<Label>
						Disputando:
						<Value>
							{` ${disputing()} ${currency}`}
						</Value>
					</Label>
					<Label>
						Referencia de método de pago:
						<Value>
							{paymentMethodReference}
						</Value>
					</Label>
				</VStack>
			</Link>
			<HStack mt={"$2.5"}>
				<Button
					onPress={handleCopy}
					variant="solid"
					action="positive"
					size="sm"
				>
					<ButtonText>
						{copied ? "Copiado!!" : "Copiar referencia"}
					</ButtonText>
				</Button>
			</HStack>
		</CardBalanceContainer>
	)
}

const CardBalanceContainer = styled(View, {
	p: "$4",
	mb: "$4",
	width: "$full",
	height: undefined,
	bg: "$backgroundLight150",
	rounded: "$xl",
	_text: {
		color: "$white",
	}
})

const Label = styled(Text, {
	fontSize: "$sm",
	fontWeight: "$bold",
	color: "$black",
	_dark: {
		color: "$white"
	}
})

const Value = styled(Label, {
	fontWeight: "$normal",
})

export default CardBalance