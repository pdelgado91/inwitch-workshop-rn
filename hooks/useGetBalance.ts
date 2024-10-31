import { useEffect, useState } from "react";
import { axiosInstance, getAccessToken } from "@/utils/networking";

const API_WALLET = process.env.EXPO_PUBLIC_API_WALLET

export default function useGetBalance(entityId: number) {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
				const url = `${API_WALLET}/entityid%40${entityId}/balance`
				const headers = {
					"X-User-Bearer": `Bearer ${token}`,
				}
        const entityBalanceRequest = await axiosInstance({
						method: "GET",
						url,
						headers
				})
        setBalance(entityBalanceRequest.data);
				setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, []);

  return {
    balance,
    loading,
    error,
  };
}