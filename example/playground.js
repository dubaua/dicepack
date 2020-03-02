import { DicePack } from '@/pack.js';
import { bindReference, create } from './render.js';
import round from '@/utils/round.js';
import randomizeDiceNotation from '@/utils/randomizeDiceNotation.js';

window.DicePack = DicePack;

const SPECIAL_DICE = [2, 4, 6, 8, 10, 12, 20];

const state = {
  refs: {
    columnNodeArray: [],
  },
  exampleNotation: getRandomNotation(),
  diceSet: null,
  distribution: null,
};

const playground = create('div.page', {}, [
  [
    'form.control',
    {
      listeners: {
        submit: function(event) {
          event.preventDefault();
          handleRoll();
        },
      },
    },
    [
      [
        'input.control__input',
        {
          ref: bindReference(state.refs, 'inputNode'),
          attributes: {
            placeholder: 'Type dice notation',
          },
        },
      ],
      [
        'button.control__button',
        {
          domProps: {
            textContent: 'Roll',
          },
        },
      ],
      [
        'div.example',
        {},
        [
          [
            'span.example__label',
            {
              domProps: {
                textContent: 'For example: ',
              },
            },
          ],
          [
            'span.example__notation',
            {
              ref: bindReference(state.refs, 'exampleNode'),
              listeners: {
                click: takeExample,
              },
              domProps: {
                textContent: state.exampleNotation,
              },
            },
          ],
        ],
      ],
    ],
  ],
  [
    'div.results',
    {},
    [
      [
        'span.results__result',
        {
          ref: bindReference(state.refs, 'resultNode'),
        },
      ],
      [
        'span.results__chance',
        {
          ref: bindReference(state.refs, 'chanceNode'),
        },
      ],
      [
        'div.results__rolls',
        {
          ref: bindReference(state.refs, 'rollsNode'),
        },
      ],
    ],
  ],

  [
    'div.chart',
    {},
    [
      [
        'div.chart__legend.legend',
        {
          ref: bindReference(state.refs, 'legendNode'),
        },
      ],
      [
        'div.chart__distribution.distribution',
        {
          ref: bindReference(state.refs, 'distributionNode'),
        },
      ],
      [
        'div.chart__message',
        {
          ref: bindReference(state.refs, 'chartMessageNode'),
        },
      ],
    ],
  ],
]);

document.body.appendChild(playground);

function getRandomNotation() {
  return randomizeDiceNotation({
    maxCount: 10,
    sides: [1, 4, 6, 8, 10, 12, 20, 100],
    maxLength: 3,
  });
}

function takeExample() {
  // paste example notation to input
  state.refs.inputNode.value = state.exampleNotation;
  // generate and show new example
  state.exampleNotation = getRandomNotation();
  state.refs.exampleNode.textContent = state.exampleNotation;
}

function handleRoll() {
  if (!state.refs.inputNode.value) {
    takeExample();
  }

  const nextNotation = state.refs.inputNode.value;
  const isChanged = nextNotation !== state.notation;
  if (isChanged) {
    try {
      state.diceSet = new DicePack(nextNotation);
      state.notation = nextNotation;
      console.log(state.diceSet);
      state.distribution = state.diceSet.distribution;
    } catch (err) {
      console.log(err);
      alert(err.message);
      // TODO handle error message
      return false;
    }
  }

  const results = state.diceSet.roll(true);
  const { result, rolls } = results;

  renderResults(result, rolls);
  renderStats(result, isChanged);
}

function renderResults(result, rolls) {
  state.refs.resultNode.textContent = result;

  const detailed = create(
    'div.detailed',
    {},
    rolls.map(group =>
      create(
        'span.detailed__group',
        {},
        group.map(({ roll, side }) => (side === 0 || side === 1 ? renderNumber(roll) : renderDie(roll, side))),
      ),
    ),
  );
  state.refs.rollsNode.innerHTML = null;
  state.refs.rollsNode.appendChild(detailed);
}

const renderDie = (roll, side) =>
  create('span.detailed__die', {}, [
    [
      'svg.detailed__die-icon',
      {},
      [
        [
          'use',
          {
            attributes: {
              'xlink:href': `#d${SPECIAL_DICE.indexOf(side) !== -1 ? side : 'N'}`,
            },
          },
        ],
      ],
    ],
    [
      `span.detailed__die-result${roll < 0 ? '.detailed__die-result--negative' : ''}`,
      {
        domProps: {
          textContent: roll,
          title: `d${side}`,
        },
      },
    ],
  ]);

const renderNumber = roll =>
  create(`span.detailed__number${roll < 0 ? '.detailed__number--negative' : ''}`, { domProps: { textContent: roll } });

function renderStats(result, isChanged) {
  // if notation wasn't changed just highlight result column
  if (!isChanged && state.distribution) {
    // update active column
    state.refs.columnNodeArray.forEach(columnNode => {
      if (columnNode.result === result) {
        columnNode.classList.add('distribution__column--active');
      } else {
        columnNode.classList.remove('distribution__column--active');
      }
    });

    // update chance
    const chance = (state.distribution.filter(column => column.result === result)[0].chance * 100).toFixed(2) + '%';
    state.refs.chanceNode.textContent = chance;

    return false;
  }

  state.refs.distributionNode.innerHTML = null;
  state.refs.legendNode.innerHTML = null;
  state.refs.chartMessageNode.innerHTML = null;
  state.refs.chanceNode.textContent = null;
  state.refs.columnNodeArray = [];

  if (state.distribution) {
    const chance = (state.distribution.filter(column => column.result === result)[0].chance * 100).toFixed(2) + '%';
    state.refs.chanceNode.textContent = chance;

    const maxChance = round(Math.max(...state.distribution.map(column => column.chance)), 3);
    const multiplier = Math.floor(1 / maxChance);
    const multipliers = [100, 50, 25, 20, 10, 5, 4, 2, 1];
    const closestMultiplier = multipliers.filter(m => m <= multiplier)[0];

    state.distribution.forEach(column => {
      const columnRefs = {};
      const columnNode = create(
        `div.distribution__column${column.result === result ? '.distribution__column--active' : ''}`,
        {},
        [
          [
            'div.distribution__bar',
            {
              style: {
                height: `${column.chance * closestMultiplier * 100}%`,
              },
              ref: bindReference(columnRefs, 'bar'),
            },
            [
              [
                'div.distribution__tooltip',
                {},
                [
                  [
                    'div.distribution__tooltip-result',
                    {
                      domProps: {
                        textContent: column.result,
                      },
                    },
                  ],
                  [
                    'div.distribution__tooltip-chance',
                    {
                      domProps: {
                        textContent: `${(column.chance * 100).toFixed(2)}%`,
                      },
                    },
                  ],
                ],
              ],
            ],
          ],
          renderColumnLegend(column),
        ],
      );
      state.refs.distributionNode.appendChild(columnNode);
      columnNode.result = column.result;
      columnNode.chance = column.chance;
      columnNode.bar = columnRefs.bar;
      state.refs.columnNodeArray.push(columnNode);
    });

    let counter = 0;
    let drawColumnsTimerId = requestAnimationFrame(function drawBar() {
      const column = state.refs.columnNodeArray[counter];
      column.bar.style.transform = 'scale(1,1)';
      counter++;
      if (counter < state.refs.columnNodeArray.length) {
        drawColumnsTimerId = requestAnimationFrame(drawBar);
      }
    });

    // update distribution classnames
    if (state.diceSet.mean % 1 !== 0) {
      state.refs.distributionNode.classList.add('distribution--shift');
    } else {
      state.refs.distributionNode.classList.remove('distribution--shift');
    }

    updateDistributionClassname();

    // render horizontal rulers
    const barCount = (100 / closestMultiplier) % 5 === 0 ? 5 : 100 / closestMultiplier;

    for (let i = 0; i <= barCount; i++) {
      const barPercent = (i * 100) / 1 / closestMultiplier / barCount;
      state.refs.legendNode.appendChild(
        create('div.legend__ruler', {
          domProps: { textContent: `${barPercent}%` },
          style: {
            bottom: `${(i / barCount) * 100}%`,
          },
        }),
      );
    }
  } else {
    state.refs.chartMessageNode.innerHTML = "Distribution wasn't calculated due to complexicity";
  }
}

function renderColumnLegend({ result }) {
  const { min, mean, max } = state.diceSet;
  const flooredMean = Math.floor(mean);

  const label = (function() {
    switch (result) {
      case min:
        return { text: 'min', details: `=${min}`, classname: '' };
      case flooredMean:
        return { text: 'mean', details: `=${mean}`, classname: mean % 1 !== 0 ? '.distribution__label--double' : '' };
      case max:
        return { text: 'max', details: `=${max}`, classname: '' };
      default:
        return null;
    }
  })();

  let labelNode = null;
  if (label) {
    labelNode = create(`div.distribution__label${label.classname}`, {}, [
      ['span.distribution__label-text', { domProps: { textContent: label.text } }],
      ['span.distribution__label-details', { domProps: { textContent: label.details } }],
    ]);
  }

  return [
    'div.distribution__legend',
    {},
    [
      [
        'div.distribution__result',
        {
          domProps: {
            textContent: result,
          },
        },
        [],
      ],
      labelNode,
    ],
  ];
}

window.addEventListener('resize', handleResize, false);

function handleResize() {
  updateDistributionClassname();
}

function updateDistributionClassname() {
  if (state.distribution) {
    const MIN_COLUMN_WIDTH = 34;

    const columnCount = state.distribution.length;
    const distributionWidth = state.refs.distributionNode.offsetWidth;

    if (columnCount * MIN_COLUMN_WIDTH > distributionWidth) {
      state.refs.distributionNode.classList.add('distribution--compact');
    } else {
      state.refs.distributionNode.classList.remove('distribution--compact');
    }
  }
}
