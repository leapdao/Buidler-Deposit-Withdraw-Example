import { usePlugin, BuidlerConfig, task } from '@nomiclabs/buidler/config'
import path = require('path')
usePlugin('@nomiclabs/buidler-ethers')
usePlugin('@nomiclabs/buidler-waffle')
import '@eth-optimism/ovm-toolchain/build/src/buidler-plugins/buidler-ovm-compiler';
import '@eth-optimism/ovm-toolchain/build/src/buidler-plugins/buidler-ovm-node';

const config = {
  mocha: {
    timeout: 50000,
  },
  solc: {
    optimizer: { enabled: true, runs: 200 },
  },
  useOvm: true
}

task('test')
	.addFlag('ovm', 'compile and run tests with OVM')
	.setAction(async (taskArguments, bre: any, runSuper) => {
		const { ovm } = taskArguments;

		if (ovm) {
      bre.config.solc.path = path.resolve(__dirname, 'node_modules', '@eth-optimism', 'solc')
      bre.config.mocha.timeout = 500000
      // bre.config.useOvm = true
		} else {
      bre.config.solc.version = "0.5.0"
    }

		await runSuper(taskArguments);
	});

export default config
