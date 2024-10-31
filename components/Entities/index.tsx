import { View, Text } from "react-native";
import { useEntities } from "./useEntities";
import {styled} from "@gluestack-style/react"

const MasterWalletEntity = () => {
	const { entity } = useEntities();

	return (
		<Box
			display="flex"
			flexDirection="column"
			my="$5" // Equivale a 20px
			mx="$3.75" // Aproximadamente 15px
			p="$5" // Equivale a 20px
			bg="$backgroundLight150" // Color de fondo según tokens
			rounded={10} // BorderRadius de 10px
			borderWidth="$1" // Equivale a 1px
			borderColor="$borderLight300" // Color de borde según tokens
			variant="softShadow.1" // Sombra suave definida en variantes
		>
			<H1>
				Nombre completo: {entity?.name?.fullName}
			</H1>
			<H2>
				Tipo de entidad: {entity?.entityType === "legalEntity" ? "Entidad legal" : "Persona fisica"}
			</H2>
			<H2>
				Fecha de creación: {entity?.creationDate}
			</H2>
		</Box>
	);
};

const H1 = styled(Text,{
	fontSize: "$2xl",
	marginBottom: "$2.5",
	color: "$black",
	_dark: {
		color: "$white"
	}
})

const H2 = styled(Text,{
	fontSize: "$xl",
	marginBottom: "$2.5",
	color: "$black",
	_dark: {
		color: "$white"
	}
})

const Box = styled(View,{
	display: "flex",
	flexDirection: "column",
	width: "$full",
	marginTop: "$5",
	marginBottom: "$5",
	marginLeft: "$3.5",	
	marginRight: "$3.5",
	paddingTop: "$5",
	paddingBottom: "$5",
	paddingLeft: "$5",
	paddingRight: "$5",
	backgroundColor: "$backgroundLight150",
	_dark: {
		backgroundColor: "$backgroundDark150"
	}
})

export default MasterWalletEntity;
