export const parseHeartRateData = (dataView: DataView) => {
  const heartRateRecords = [];
  let offset = 1; // Skip the start byte

  while (offset < dataView.byteLength) {
    const dataNumber = dataView.getUint16(offset, true);
    offset += 2;

    const year = dataView.getUint8(offset++) + 2000;
    const month = dataView.getUint8(offset++);
    const day = dataView.getUint8(offset++);
    const hour = dataView.getUint8(offset++);
    const minute = dataView.getUint8(offset++);
    const second = dataView.getUint8(offset++);
    const baseTime = new Date(year, month - 1, day, hour, minute, second);

    const heartRateValues = [];
    for (let i = 0; i < 12; i++) {
      heartRateValues.push(dataView.getUint8(offset++));
    }

    const heartRateMeasurements = heartRateValues.map((hrValue, index) => ({
      time: new Date(baseTime.getTime() + index * 10 * 1000),
      heartRate: hrValue,
    }));

    heartRateRecords.push({ dataNumber, baseTime, heartRateMeasurements });
  }

  console.log('Heart Rate Records:', heartRateRecords);
};
