import app from './app'

const patientCRUD = require('./routes/patientCRUDRoute');
const injuredSide = require('./routes/injuredSideCRUDRoute');
const affectedLimb = require('./routes/affectedLimbCRUDRoute');
const JoinTable1 = require('./routes/affectedLimbInjuedSidePatientCRUDRoute');
const dailyTX = require('./routes/dailyTxCRUDRoute');
const tool = require('./routes/toolCRUDRoute');
const diagnosis = require('./routes/diagnosisCRUDRoute');
const testType = require('./routes/testTypeCRUDRoute');
const appoiCRUD = require('./routes/appointmentCRUDRoute');
const txCRUD = require('./routes/txCRUDRoute');
const doctorCRUD = require('./routes/doctorCRUDRoute');
const test = require('./routes/test');
const testTypeTestCRUD = require('./routes/testTypetestpatCRUDRoute');
const adminCRUD = require('./routes/adminCRUDRoute');
const auth = require('./auth/controller');
const smoking = require('./routes/smokingCRUDRoute');
const paymentM = require('./routes/paymentMethodCRUDRoute');
const physcl = require('./routes/physCRUDRoute');
const smokinPatient = require('./routes/patientSmokingCRUDRoute');
const physPatient = require('./routes/physPatientCRUDRoute');
const patientDiagnosis = require('./routes/patientDiagnosisCRUDRoute');

patientDiagnosis.patientDiagnosisCRUD();
physPatient.physPatientCRUD();
smokinPatient.smokingPatientCRUD();
physcl.physiclCRUD();
paymentM.paymentMethodCRUD();
smoking.smokingCRUD();
adminCRUD.adminCRUD();
auth.Auth();
testTypeTestCRUD.testTypeTestCRUD();
test.testCRUD();
doctorCRUD.doctorCRUD();
txCRUD.txCRUD();
appoiCRUD.appointmentCRUD();
testType.testTypeCRUD();
diagnosis.diagnosisCRUD();
tool.toolCRUD();
dailyTX.dailyTxCRUD();
JoinTable1.affectedLimbInjuredSidePatientCRUD();
affectedLimb.affectedLimbCRUD();
patientCRUD.patientCRUD();
injuredSide.injuredSideCRUD();

/*
fast testing the server in the loading
*/
app.get('/',(req,res)=>res.send('okay'));
app.listen( 8080, () => console.log('server listening on port 8080') )
