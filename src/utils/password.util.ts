import bcrypt from 'bcrypt';

const passwordHashing = async (password: string): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

const passwordCompare = async (password: string, passwordHash: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};

export { passwordHashing, passwordCompare };
