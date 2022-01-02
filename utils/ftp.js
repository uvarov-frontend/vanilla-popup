const FtpDeploy = require('ftp-deploy');
const ftp = require('../.ftp');

/**
// Шаблон файла .ftp
module.exports = {
  user: '',
  password: '',
  host: '',
  port: 21,
  root: '/'
}
 */

new FtpDeploy().deploy({
	user: ftp.user,
	password: ftp.password,
	host: ftp.host,
	port: ftp.port,
	remoteRoot: ftp.root,
	localRoot: `${__dirname}/../build`,
	include: ['.*', '*', '**/*'],
	exclude: ['.DS_Store'],
	deleteRemote: true,
	forcePasv: true,
	sftp: false,
});
