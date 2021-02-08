import { parseString } from 'xml2js';

const parseObject = (codeObj : { [key: string] : any }) => {
    (codeObj.block || []).forEach((block : any) => {
        console.log(JSON.stringify(block, null, 2))
    });

}

const codeFromXml = (code : String) => {
    parseString(code, (err, result) => {
        if (err !== null) {
            console.error(err);
        } else {
            parseObject(result.xml);
        }
    });
}

export { codeFromXml }