const formatErrorMessage = (message: string): string => {
  message = message.toLowerCase();

  if (message.includes('cannot add to expired lock. withdraw')) return 'Cannot add to an expired lock. You need to Withdraw.';
  if (message.includes(`withdraw old tokens first`)) return 'Withdraw old tokens first.';
  if (message.includes('can only lock until time in the future')) return `Can only lock for future unlock time.`;
  if (message.includes('voting lock can be 4 years max')) return `Voting lock cannot be greater than 4 Years.`;
  if (message.includes('no existing lock found')) return 'No lock found.';
  if (message.includes('nothing is locked')) return 'Nothing is locked.';
  if (message.includes('can only increase lock duration')) return 'Can only increase the lock duration.';
  if (message.includes('lock expired')) return 'The lock has expired.';
  if (message.includes("the lock didn't expire")) return 'The lock did not expire.';
  if (message.includes("fallback not initiated")) return 'Emergency withdraw is not enabled.';

  // Fail safes like overflows etc.;
  return 'Error Occured, Please try again later.';
};

export default formatErrorMessage;
