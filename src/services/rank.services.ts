import Doctor from '~/models/Doctor.model';
import Rank from '~/models/Rank.model';

const getAllRank = async () => {
  const ranks = await Rank.findAll();
  return ranks;
};

const getRank = async (id: number) => {
  const rank = await Rank.findOne({
    where: { id },
    nest: true,
    include: {
      model: Doctor,
      as: 'doctors',
    },
  });
  return rank;
};

export default { getAllRank, getRank };
