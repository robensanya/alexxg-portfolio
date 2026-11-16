const scenarios = {
  needs: {
    intro: "Клиент оставил заявку на занятия английским. Начни с его ситуации и выясни, какой результат ему пригодится.",
    steps: [
      {
        client: "Я хочу подтянуть английский. На работе всё чаще приходится на нём общаться.",
        choices: [
          {
            reply: "Вам удобнее заниматься по утрам или по вечерам?",
            feedback: "Расписание пригодится позже. Сначала спроси, что именно происходит на работе и где английский уже нужен.",
            next: "Расписание пока не знаю. Вот на прошлой встрече с командой я понял вопрос, но не смог объяснить, почему сдвинулся срок."
          },
          {
            reply: "Вспомните недавнюю рабочую ситуацию, где вам не хватило английского. Что произошло?",
            feedback: "Вопрос о конкретном эпизоде помогает понять, какое действие человеку даётся с трудом.",
            strong: true,
            next: "На последней встрече с командой я понял вопрос, но не смог объяснить, почему сдвинулся срок."
          },
          {
            reply: "Вам нужна деловая лексика, правильно?",
            feedback: "В вопросе уже есть готовый диагноз. Из ответа клиента следует, что важна способность быстро объясниться в разговоре.",
            next: "Термины вроде знаю. Но на последней встрече я не смог сходу объяснить, почему сдвинулся срок."
          }
        ]
      },
      {
        choices: [
          {
            reply: "Вы часто участвуете в таких встречах?",
            feedback: "Вопрос уточняет частоту. Чтобы понять, чему учиться, спроси, какое действие даётся сложнее всего и когда оно понадобится.",
            next: "Раз в неделю. Через месяц сам веду встречу: нужно дать короткий статус и справиться с вопросами без подготовки."
          },
          {
            reply: "Что вы хотели бы сделать увереннее на ближайшей встрече? Когда она будет?",
            feedback: "Теперь есть цель, которую можно наблюдать и отработать, и срок, к которому она понадобится.",
            strong: true,
            next: "Через месяц я впервые веду встречу. Хочу коротко рассказывать о статусе проекта и отвечать даже на вопросы, которых не ждал."
          },
          {
            reply: "Тогда вам подойдут занятия по грамматике. Согласны?",
            feedback: "Предложение звучит слишком рано. Цель клиента связана с рабочим созвоном, а нужный формат ещё предстоит выбрать.",
            next: "Я пока не уверен насчёт грамматики. Через месяц веду встречу: надо кратко дать статус и справиться с неожиданными вопросами."
          }
        ]
      },
      {
        choices: [
          {
            reply: "Значит, вы хотите заниматься английским для работы. Всё верно?",
            feedback: "Такое резюме упускает срок и конкретную задачу. Назови действия, по которым клиент сможет заметить прогресс.",
            next: "Да, но мне бы в первую очередь подготовиться к созвону через месяц."
          },
          {
            reply: "Тогда запишем вас на занятия прямо сейчас?",
            feedback: "Прежде чем обсуждать запись, проверь, что вы одинаково поняли запрос.",
            next: "Подождите. Я хочу сначала понять, будем ли мы тренировать рабочие созвоны."
          },
          {
            reply: "Если я правильно понял, к созвону через месяц вы хотите уверенно давать короткий статус и отвечать на вопросы команды. Всё так?",
            feedback: "Резюме связывает рабочую ситуацию, срок и наблюдаемое действие. Клиент может подтвердить или поправить это понимание.",
            strong: true,
            next: "Да. Особенно хочу потренировать вопросы, которых не было в повестке."
          }
        ]
      }
    ],
    recap: "Рабочая последовательность: спросить о конкретном эпизоде, уточнить цель и срок, затем проверить своё понимание."
  },
  objections: {
    intro: "Клиенту интересна практика рабочих созвонов, но предложение вызывает сомнение. Выясни причину и проверь, какой следующий шаг ему подходит.",
    steps: [
      {
        client: "По описанию подходит, но для меня дороговато.",
        choices: [
          {
            reply: "Понимаю. Сумма выше вашего бюджета или пока сложно оценить, что входит в занятия?",
            feedback: "Ты признал сомнение и оставил клиенту пространство назвать причину. Дальше можно ответить по существу.",
            strong: true,
            next: "За такую сумму мне важно понять, будут ли мы разбирать мои рабочие созвоны. Просто разговорные занятия у меня уже были."
          },
          {
            reply: "Если решить сегодня, я смогу попросить скидку.",
            feedback: "Скидка поможет, если вопрос в бюджете. Ты пока не знаешь причину, а срочность добавляет давление.",
            next: "Дело не только в цене. Не хочу снова платить за общие темы, когда мне надо подготовиться к созвонам."
          },
          {
            reply: "Но занятия с преподавателем обычно стоят именно столько.",
            feedback: "Объяснение цены может звучать как спор. Выясни, по каким признакам клиент оценит, подходят ли ему занятия.",
            next: "Возможно. Я просто не вижу, будут ли там мои рабочие ситуации."
          }
        ]
      },
      {
        choices: [
          {
            reply: "Давайте я расскажу обо всех форматах и преимуществах программы.",
            feedback: "Обзор расширит разговор, но оставит исходный вопрос открытым. Лучше покажи конкретную практику, связанную с созвоном.",
            next: "Спасибо. Пришлите лучше пример задания сообщением. Сейчас уже нужно идти."
          },
          {
            reply: "Могу показать пример задания: короткий статус по проекту и ответы на уточнения. По нему вы сможете оценить формат. Это то, что вам важно?",
            feedback: "Ты связал ответ с рабочей задачей клиента и предложил способ проверить формат до решения.",
            strong: true,
            next: "Да, это то, что хотел увидеть. Пришлите пример сообщением, пожалуйста. На звонке дальше обсуждать уже не могу."
          },
          {
            reply: "Уверен, после нескольких занятий вы перестанете волноваться на созвонах.",
            feedback: "Обещание результата только усложняет выбор. Покажи, какое упражнение реально можно попробовать.",
            next: "Я бы лучше увидел упражнение. Можете прислать его сообщением? Сейчас мне пора."
          }
        ]
      },
      {
        choices: [
          {
            reply: "Тогда давайте быстро согласуем время пробного занятия.",
            feedback: "Клиент уже сказал, что пора заканчивать. Согласуй только тот шаг, на который он дал согласие.",
            next: "Нет, сейчас не готов записываться. Мне правда нужно идти."
          },
          {
            reply: "Хорошо, пришлю пример задания сообщением. Спасибо за разговор!",
            feedback: "Ты подтвердил конкретный следующий шаг и завершил разговор в удобный для клиента момент.",
            strong: true,
            next: "Спасибо. Посмотрю, когда освобожусь."
          },
          {
            reply: "Хорошо, тогда перезвоню вам завтра.",
            feedback: "Перезвон не согласован. Если клиент попросил пример, можно завершить разговор, подтвердив отправку примера.",
            next: "Перезванивать пока не нужно. Достаточно сообщения."
          }
        ]
      }
    ],
    recap: "Рабочая последовательность: покажи, что услышал сомнение, уточни причину, предложи подходящий шаг и проверь согласие."
  }
};

const template = document.querySelector("#practice-template");

for (const practice of document.querySelectorAll("[data-scenario]")) {
  const scenario = scenarios[practice.dataset.scenario];
  practice.replaceChildren(template.content.cloneNode(true));

  const intro = practice.querySelector(".practice-intro");
  const stepLabel = practice.querySelector(".step");
  const client = practice.querySelector(".client");
  const instruction = practice.querySelector(".instruction");
  const choices = practice.querySelector(".choices");
  const feedback = practice.querySelector(".feedback");
  const advance = practice.querySelector(".advance");
  intro.textContent = scenario.intro;

  let stepIndex = 0;
  let clientReply = scenario.steps[0].client;
  let strongReplies = 0;
  let complete = false;

  function showStep() {
    const step = scenario.steps[stepIndex];
    stepLabel.textContent = `Шаг ${stepIndex + 1} из ${scenario.steps.length}`;
    client.textContent = `Клиент: «${clientReply}»`;
    choices.replaceChildren();
    feedback.replaceChildren();
    advance.hidden = true;
    instruction.hidden = false;
    choices.hidden = false;

    for (const option of step.choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = `«${option.reply}»`;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        for (const alternative of choices.children) alternative.disabled = true;
        button.setAttribute("aria-pressed", "true");
        strongReplies += Number(Boolean(option.strong));
        clientReply = option.next;
        const message = document.createElement("p");
        message.textContent = option.feedback;
        feedback.replaceChildren(message);
        advance.textContent = stepIndex === scenario.steps.length - 1 ? "Посмотреть итог →" : "Услышать клиента →";
        advance.hidden = false;
        advance.focus({ preventScroll: true });
      });
      choices.append(button);
    }
  }

  function showRecap() {
    complete = true;
    stepLabel.textContent = "Итог практики";
    client.textContent = `Клиент: «${clientReply}»`;
    instruction.hidden = true;
    choices.hidden = true;
    const score = document.createElement("p");
    score.textContent = `Удачных реплик: ${strongReplies} из ${scenario.steps.length}.`;
    const recap = document.createElement("p");
    recap.textContent = scenario.recap;
    feedback.replaceChildren(score, recap);
    advance.textContent = "Пройти ещё раз";
  }

  advance.addEventListener("click", () => {
    if (complete) {
      complete = false;
      stepIndex = 0;
      strongReplies = 0;
      clientReply = scenario.steps[0].client;
      showStep();
    } else if (stepIndex === scenario.steps.length - 1) {
      showRecap();
    } else {
      stepIndex += 1;
      showStep();
    }
    client.focus();
  });

  showStep();
}
