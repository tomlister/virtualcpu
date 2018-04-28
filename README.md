# virtualcpu
## A very basic virtual computer.

![alt text](https://github.com/tomlister/virtualcpu/raw/master/src/demo.gif "Demo")

You can write ascii to the video memory address 0xb8 and it will print to the screen.

VASM
```
mov ax, 0xb8
mov [ax], 0x48
inc ax
mov [ax], 0x65
inc ax
mov [ax], 0x79
```

Machine Code
```
01E0B801 D0E0D048 02E001D0 E0D06502 E001D0E0 D079
```

VGA Output:
```
Hey
```

### Current Instruction Set
+ mov -- move
+ inc -- increment

### Next Revision's Instruction Set
+ mov -- move
+ inc -- increment
+ db -- define byte
+ equ -- assign values to symbols
+ cmp -- compare
+ jne -- jump if not equal

