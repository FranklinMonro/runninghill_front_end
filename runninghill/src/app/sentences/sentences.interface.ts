interface WordTypes {
  typeID: string;
  wordType?: string;
}

interface SentenceTypes {
  senteceID: string;
  sentence?: string;
}

interface WordsApiDataResults {
  total?: number;
  data?: string[];
}

interface WordsApiDataReturn {
  page?: string;
  results?:WordsApiDataResults;
}

export {
  WordTypes,
  SentenceTypes,
  WordsApiDataReturn,
};
