from random import *

D1 = (random()*6) // 1
D2 = (random()*6) // 1
D3 = (random()*6) // 1
print(D1)
print(D2)
print(D3)

if (D1 == 6 or D2 == 6 or D3 == 6):
    print("oui")

comp = 0

if (D1 == 6) :
    comp = comp + 1
if (D2 == 6) :
    comp = comp + 1
if (D3 == 6) :
    comp = comp + 1

print(comp)

print(D1+D2+D3)