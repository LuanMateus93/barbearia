# Regras de Negócio 
## 1. Cadastro de Usuários
- **Regra 1:** Apenas usuários registrados podem acessar funcionalidades restritas do sistema.
- **Regra 2:** Cada usuário deve fornecer um e-mail único e válido para cadastro.
- **Regra 3:** O cadastro de barbeiros deve ser aprovado por um administrador.
- **Regra 4:** O cadastro de clientes é imediato após a confirmação do e-mail.

## 2. Agendamento de Serviços
- **Regra 5:** Clientes podem agendar serviços apenas em horários disponíveis e não bloqueados pelos barbeiros.
- **Regra 6:** Um cliente pode ter apenas um agendamento ativo por vez para o mesmo serviço.
- **Regra 7:** Agendamentos devem ser feitos com no mínimo 24 horas de antecedência.
- **Regra 8:** Clientes podem cancelar agendamentos com até 12 horas de antecedência sem penalidades.

## 3. Bloqueio de Horários
- **Regra 9:** Barbeiros podem bloquear horários com até 30 dias de antecedência.
- **Regra 10:** Bloqueios de horários devem ser feitos com no mínimo 24 horas de antecedência.
- **Regra 11:** Barbeiros não podem bloquear horários que já possuam agendamentos confirmados.

## 4. Gerenciamento de Serviços
- **Regra 12:** Barbeiros podem adicionar, editar e remover serviços que oferecem, desde que informem detalhes como descrição e preço.
- **Regra 13:** Cada serviço deve ter um preço mínimo definido pelo administrador.
- **Regra 14:** Alterações nos serviços (descrição ou preço) só são efetivadas após aprovação do administrador.

## 5. Interface Responsiva
- **Regra 15:** A interface deve ser compatível com os principais navegadores e dispositivos móveis.
- **Regra 16:** Qualquer funcionalidade deve estar acessível tanto em dispositivos móveis quanto em desktops.

## 6. Segurança e Privacidade
- **Regra 17:** Dados dos usuários devem ser armazenados de forma segura, utilizando criptografia.
- **Regra 18:** Apenas administradores têm acesso completo aos dados dos usuários e barbeiros.
- **Regra 19:** Logs de acessos e ações críticas devem ser mantidos por pelo menos um ano para auditoria.

## 7. Notificações e Lembretes
- **Regra 20:** Clientes e barbeiros devem receber notificações por e-mail sobre novos agendamentos, cancelamentos e alterações.
- **Regra 21:** Lembretes automáticos de agendamentos devem ser enviados 24 horas e 1 hora antes do horário marcado.
