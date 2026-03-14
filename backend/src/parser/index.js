import { ApiError } from "../utils/ApiError.js"
import parser from 'simple-excel-to-json'

const csvParser = async(data) => {
      const parsData = await parser.parseXls2Json(data)
      // console.log(parsData);
      return parsData
}


const xlsxParser = async(data) => {
  const parsData = await parser.parseXls2Json(data)
  // console.log(parsData);
  return parsData
}


const parseData = async (data,extension) => {

  let parseData;
    if(extension === ".xlsx") {
     parseData = await  xlsxParser(data)
    } else if( extension === ".csv") {
     parseData = await  csvParser(data)
    } else {
        throw new ApiError(400, "only xlsx and csv file can allowed")
    }
    // console.log("parseData",parseData[0]);

    return parseData[0]
}

export default parseData
