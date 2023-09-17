import Role from '~/models/Role.model';
import User from '~/models/User.model';
import Doctor from '~/models/Doctor.model';
import Booking from '~/models/Booking.model';
import Clinic from '~/models/Clinic.model';
import ClinicRank from '~/models/ClinicRank.model';
import ClinicTechnique from '~/models/ClinicTechnique.model';
import History from '~/models/History.model';
import Rank from '~/models/Rank.model';
import RankTechnique from '~/models/RankTechnique.model';
import Schedule from '~/models/Schedule.model';
import Technique from '~/models/Technique.model';
import TimeSlot from '~/models/Time-slot.model';

const modelRelationship = () => {
  Role.hasMany(User, { as: 'users' });
  Role.hasMany(Doctor, { as: 'doctors' });

  User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
  User.hasMany(History, { as: 'history' });
  User.hasMany(Booking, { as: 'bookings' });

  Doctor.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
  Doctor.belongsTo(Rank, { as: 'rank', foreignKey: 'rankId' });
  Doctor.belongsTo(Technique, { as: 'technique', foreignKey: 'techniqueId' });
  Doctor.belongsTo(Clinic, { as: 'clinic', foreignKey: 'clinicId' });
  Doctor.hasMany(Schedule, { as: 'schedules' });
  Doctor.hasMany(History, { as: 'history' });
  Doctor.hasMany(Booking, { as: 'bookings' });

  Schedule.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  Schedule.belongsTo(TimeSlot, { as: 'timeSlot', foreignKey: 'timeSlotId' });

  History.belongsTo(User, { as: 'user', foreignKey: 'patientId' });
  History.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  History.belongsTo(TimeSlot, { as: 'timeSlot', foreignKey: 'timeSlotId' });

  Booking.belongsTo(User, { as: 'user', foreignKey: 'patientId' });
  Booking.belongsTo(Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  Booking.belongsTo(TimeSlot, { as: 'timeSlot', foreignKey: 'timeSlotId' });

  Rank.hasMany(Doctor, { as: 'doctors' });
  Rank.belongsToMany(Clinic, { through: ClinicRank });
  Rank.belongsToMany(Technique, { through: RankTechnique });

  Clinic.hasMany(Doctor, { as: 'doctors' });
  Clinic.belongsToMany(Rank, { through: ClinicRank, as: 'ranks' });
  Clinic.belongsToMany(Technique, { through: ClinicTechnique, as: 'techniques' });

  Technique.hasMany(Doctor, { as: 'doctors' });
  Technique.belongsToMany(Rank, { through: RankTechnique });
  Technique.belongsToMany(Clinic, { through: ClinicTechnique });

  TimeSlot.hasMany(Schedule, { as: 'schedules' });
  TimeSlot.hasMany(History, { as: 'history' });
  TimeSlot.hasMany(Booking, { as: 'bookings' });
};

export default modelRelationship;
