import bunyan, { LogLevel } from 'bunyan'
import bunyanFormat from 'bunyan-format'
import config from './server/config'

const formatOut = bunyanFormat({ outputMode: 'short', color: !config.production })

const logger = bunyan.createLogger({
  name: 'Hmpps Community Accommodation 2 Ui',
  stream: formatOut,
  level: (process.env.LOG_LEVEL || 'info') as LogLevel,
})

export default logger
