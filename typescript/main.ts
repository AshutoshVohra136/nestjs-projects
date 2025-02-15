type ApiResponse = {
  data: any;
  isError: boolean;
};

type ApiResponse1<T> = {
  data: T;
  isError: boolean;
};

/*
a good aproach use generic instead of any


type ApiResponse <T> = {

    data:T,
    isError:boolean

}

*/

const response: ApiResponse = {
  data: {
    name: "alis",
    age: 12,
  },
  isError: false,
};

const response1: ApiResponse1<{ name: string; age: number }> = {
  data: {
    name: "Tinku",
    age: 12,
  },
  isError: false,
};

console.log(response);
console.log(response1);
