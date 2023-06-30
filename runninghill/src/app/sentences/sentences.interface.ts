interface WordTypes {
  typeID: string;
  wordType?: string;
}

interface SentenceTypes {
  senteceID: string;
  sentence?: string;
}

interface SencteceReturns {
  total: number;
  result: SentenceTypes[];
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
  SencteceReturns,
  WordsApiDataReturn,
  WordsApiDataResults,
};
