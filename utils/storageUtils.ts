import { Storage } from 'aws-amplify';

export const SaveInBucket = (path: string, file: File) => 
  Storage.put(path, file)
