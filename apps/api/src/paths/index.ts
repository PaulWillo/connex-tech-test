import { Interaction } from '../util/models/Interaction';
import { Agent } from '../util/models/Agent';
import { Customer } from '../util/models/Customer';


// Associations
Interaction.belongsTo(Agent, { foreignKey: 'agent_id' });
Interaction.belongsTo(Customer, { foreignKey: 'customer_id' });

Agent.hasMany(Interaction, { foreignKey: 'agent_id' });
Customer.hasMany(Interaction, { foreignKey: 'customer_id' });

export { Agent, Customer, Interaction };