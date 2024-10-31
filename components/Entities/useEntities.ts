import { useEffect, useState } from "react";
import { entityMaster } from "@/utils/constant";
import { axiosInstance, getAccessToken } from "@/utils/networking";

const API_ENTITIES = process.env.EXPO_PUBLIC_API_ENTITIES;

export const useEntities = () => {
	const [entity, setEntity] = useState<any>({});
	
	const getMasterEntity = async () => {
			const token = await getAccessToken();
			const url = `${API_ENTITIES}/${entityMaster}`;
			const entityMasterRequest = await axiosInstance({
				method: "GET",
				url,
				headers: {
					"X-User-Bearer": `Bearer ${token}`,
				},
			})
			setEntity(entityMasterRequest.data);
	};

  useEffect(() => {
    getMasterEntity();
  }, []);

	return {entity};
}