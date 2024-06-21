import request from '@/utils/request';

export default function(param) {
  const { testData } = param;
  if (testData) {
    return new Promise(resolve => {
      resolve(testData);
    })
  }
  else return request(param)
}