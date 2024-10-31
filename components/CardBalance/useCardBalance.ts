import { useCallback, useEffect, useMemo, useState } from "react";
import * as Clipboard from 'expo-clipboard';
import { getDarkColor } from "@/utils/networking";

const labels = ["available", "reserved", "unsettled", "disputing"] as const;

type findAmount = (label: typeof labels[number]) => string;

interface useCardBalanceProps{}

const useCardBalance = <T extends useCardBalanceProps>(props: T) => {
	const {
    paymentMethodAlias,
    paymentMethodReference,
    paymentMethodType,
    paymentMethodTypeClass,
  } = props;
	const [copied, setCopied] = useState(false);
  const findAmount:findAmount = (label: string) => {
    const amount = props?.balance?.amounts?.find(
      (amount: any) => amount.label === label
    )?.amount;
    return amount ? parseFloat(amount).toFixed(2) : "n/a";
  };
  const available = findAmount(labels[0]);
  const reserved = findAmount(labels[1]);
  const unsettled = findAmount(labels[2]);
  const disputing = useCallback(() => findAmount(labels[3]), []);
  const currency = props?.balance?.currency;
  const color = useMemo(() => getDarkColor(), []);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(paymentMethodReference);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

	return {
		available,
		reserved,
		unsettled,
		disputing,
		currency,
		color,
		handleCopy,
		copied,
		paymentMethodAlias,
		paymentMethodReference,
		paymentMethodType,
		paymentMethodTypeClass
	};
}
export default useCardBalance