import { getDiceSet } from '../index.js';
import { create, bindReference } from './render.js';
import * as utils from './utils.js';

const SPECIAL_DICE = [2, 4, 6, 8, 10, 12, 20];

const state = {
  refs: {
    columnNodeArray: [],
  },
  exampleNotation: utils.getRandomNotation(),
  diceSet: null,
  stats: null,
};

let playground = create('div.page', {}, [
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

function takeExample() {
  // paste example notation to input
  state.refs.inputNode.value = state.exampleNotation;
  // generate and show new example
  state.exampleNotation = utils.getRandomNotation();
  state.refs.exampleNode.textContent = state.exampleNotation;
}

function handleRoll() {
  if (!state.refs.inputNode.value) takeExample();

  const nextNotation = state.refs.inputNode.value;
  const isChanged = nextNotation !== state.notation;
  if (isChanged) {
    try {
      state.diceSet = getDiceSet(nextNotation);
      state.notation = nextNotation;

      const complexity = state.diceSet.dice.reduce((acc, { side, count }) => acc * Math.pow(side, Math.abs(count)), 1);
      state.stats = complexity <= 50000 ? state.diceSet.stats() : null;
    } catch (err) {
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
        group.map(({ type, rolled, side }) => (type === 'die' ? renderDie(rolled, side) : renderNumber(rolled)))
      )
    )
  );
  state.refs.rollsNode.innerHTML = null;
  state.refs.rollsNode.appendChild(detailed);
}

const renderDie = (rolled, side) =>
  create('span.detailed__die', {}, [
    [
      'svg.detailed__die-icon',
      {},
      [
        [
          'use',
          {
            attributes: {
              'xlink:href': `#d${SPECIAL_DICE.includes(side) ? side : 'N'}`,
            },
          },
        ],
      ],
    ],
    [
      'span.detailed__die-result',
      {
        domProps: {
          textContent: rolled,
          title: `d${side}`,
        },
      },
    ],
  ]);

const renderNumber = rolled => create('span.detailed__number', { domProps: { textContent: rolled } });

function renderStats(result, isChanged) {
  // if notation wasn't changed just highlight result column
  if (!isChanged && state.stats) {
    // update active column
    state.refs.columnNodeArray.forEach(columnNode => {
      if (columnNode.result === result) {
        columnNode.classList.add('distribution__column--active');
      } else {
        columnNode.classList.remove('distribution__column--active');
      }
    });

    // update chance
    let chance = (state.stats.distribution.filter(column => column.result === result)[0].chance * 100).toFixed(2) + '%';
    state.refs.chanceNode.textContent = chance;

    return false;
  }

  state.refs.distributionNode.innerHTML = null;
  state.refs.legendNode.innerHTML = null;
  state.refs.chartMessageNode.innerHTML = null;
  state.refs.chanceNode.textContent = null;
  state.refs.columnNodeArray = [];

  if (state.stats) {
    let chance = (state.stats.distribution.filter(column => column.result === result)[0].chance * 100).toFixed(2) + '%';
    state.refs.chanceNode.textContent = chance;

    const maxChance = utils.round(Math.max(...state.stats.distribution.map(column => column.chance)), 3);
    const multiplier = Math.floor(1 / maxChance);
    const multipliers = [100, 50, 25, 20, 10, 5, 4, 2, 1];
    const closestMultiplier = multipliers.filter(m => m <= multiplier)[0];

    state.stats.distribution.forEach(column => {
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
        ]
      );
      state.refs.distributionNode.appendChild(columnNode);
      columnNode.result = column.result;
      state.refs.columnNodeArray.push(columnNode);
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
        })
      );
    }
  } else {
    state.refs.chartMessageNode.innerHTML = "Distribution wasn't calculated due to complexicity";
  }
}

function renderColumnLegend({ result }) {
  const { min, mean, max } = state.diceSet;
  const flooredMean = Math.floor(mean);

  let label = (function() {
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
  if (state.stats) {
    const MIN_COLUMN_WIDTH = 34;

    const columnCount = state.stats.distribution.length;
    const distributionWidth = state.refs.distributionNode.offsetWidth;

    if (columnCount * MIN_COLUMN_WIDTH > distributionWidth) {
      state.refs.distributionNode.classList.add('distribution--compact');
    } else {
      state.refs.distributionNode.classList.remove('distribution--compact');
    }
  }
}
