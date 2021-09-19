import { useRef } from 'react';

import generateRandomId from '../lib/utils/generate-random-id';

const useRandomId = () => useRef(generateRandomId()).current;

export default useRandomId;
