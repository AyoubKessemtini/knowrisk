export const toBCD = (value: number) => {
  // eslint-disable-next-line no-bitwise
  return ((value / 10) << 4) | value % 10;
};

export const calculateCRC = (data: number[]) => {
  // eslint-disable-next-line no-bitwise
  return data.reduce((acc, byte) => acc + byte, 0) & 0xff;
};
