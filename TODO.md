# Showcase

Показать, что нелинейные зависимости можно применять не только в задротских настолках. Эти же принципы можно применять при генерации анимаций.

Спецификация

Поле ввода дайс нотейшн.
Поверх инпута или рядом примерчик, который можно подставить в инпут.
Принимает строку, валидируется на блюр.

Кнопка ролл. Если поле пустое, подставить из примера.
Ролл забирает нотейшн из инпута, валидирует, если невалидно, показывает ошибку.
Если валидно, запоминает набор кубиков, роллит, показывает результат, шанс текущего результата, показывает роллы.
Если предыдущий набор отличен от текущего, собирает статистику и показывает статистику.

# Star Field

Справа налево зведы

# Dust under light spot

Пыль под лампой

Было бы круто подвезти контролы, которые меняют скорость, интенсивность генерации и нелинейность рандома.

split code
add microbundle

make stats method async
add backend stats calculations

add usage to README
place and name getDiceSet first, then separate methods

Split normalize to normalizeDiceArray and toNotation
statsDice should normalize for performance
rewrite directProduct from reducer to function for performance
extract library methods folder up

log
roll crypto

add JSDoc, add jsconfig

# Playground

Print average, variance, standardDeviation

Явно указать, что Dice - это один набор костей с одинаковой гранью: 2d6, d4, 1, статичное число, это тоже дайс, просто с модификатором для упрощения либы.
DiceArray это набор наборов костей.
