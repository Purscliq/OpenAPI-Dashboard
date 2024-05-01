export const formatDate = (dob: string) => {
    const date = new Date(dob);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  export const formatMoney = (
    amount: string | number | bigint,
    locale = 'en-NG',
    currency = 'NGN'
  ): string => {
    // Convert amount to a number
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });
  
    return formatter.format(numericAmount);
  };