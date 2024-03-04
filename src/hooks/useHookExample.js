import { useState, useEffect } from 'react';

function useHookExample(cmsEvents) {
  const [status, setStatus] = useState([]);

  return { status };
}

export default useHookExample;
