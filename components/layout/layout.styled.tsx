import tw, { styled } from "twin.macro";

export const Section = styled.div`
  ${tw`px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8`}
`;

export const Background = styled.div`
  ${tw`flex items-center justify-center py-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl sm:px-6`}
`;

export const Content = styled.div`
  ${tw`max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8`}
`;

export const Card = styled.div`
  ${tw`relative px-6 py-10 overflow-hidden bg-indigo-600 shadow-xl rounded-2xl sm:px-16 sm:py-10`}
`;

export const CardTitle = styled.h2`
  ${tw`text-3xl font-bold tracking-tight text-white sm:text-4xl`}
`;

export const CardDescription = styled.p`
  ${tw`max-w-2xl mx-auto mt-6 text-lg text-indigo-200`}
`;

export const Form = styled.div`
  ${tw`space-y-6`}
`;

export const Button = styled.button`
  ${tw`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
`