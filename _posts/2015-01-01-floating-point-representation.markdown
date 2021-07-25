---
title:  "Floating point representation of real numbers."
date:   2015-01-01 10:08:00
tags: ['arithmetic', 'floating-point', 'numerical-analysis']
categories: programming numerical-analysis
permalink: /programming/numerical-analysis/floating-point-representation-of-real-numbers/
---
<style type="text/css">
	h3
	{
		color: rgb(128,128,255);
	}
	table
	{
		width: 600px;
	}
	td
	{
		border: 1px solid black;
		text-align: center;
		height: 20px;
	}
</style>

<h3>Real number representation:</h3>
<p> As we have seen <a href="/numerical-analysis/integer-representation-in-computer/">earlier</a>, integers can be represented by the combination of binary digits, same is the case with real numbers, but representation is a bit different.
There can be many techniques to represent them, but most efficient and useful is floating point representation. The reason is described below:</p>

<h3>Why:</h3>
To understand, why floating point representation is better, we first need to know, what the alternatives are? here are those,
<ol>
	<p><li>Treat real number as a combination of two integers.</li>
	<li>Fixed decimal, sign bit representation.</li></p>
</ol>
But these have some disadvantages,
<ol>
	<p><li>First: It does not seem to be logical. When we go this way, we need to use extra memory to keep track of the separated parts. Whenever we need to perform operation, it becomes more overhead.</li>
    <li>Second: It has limits that restrict the wide range of numbers and also calculations. With this, we need to compromise with the accuracy, though floating point is no different here, but still much better than fixed one.</li></p>
</ol>

<h3>How:</h3>
<ol>
	<p>
	<li><a href="#normalize">Normalize</a> the number.</li>
	<li>The number now can be separated in two parts, one is the decimal part called mantissa, and the other is the exponent. Now the number can be represented as:</li><br>
	</p>
		<table>
			<tr>
				<td>sign</td>
				<td>m   </td>
				<td>m   </td>
				<td>m   </td>
				<td>m   </td>
				<td>sign</td>
				<td>e   </td>
				<td>e   </td>
			</tr>
		</table>
</ol>
<br>
<p>The above is a simple example of 8 bit representation, there are 32, 64 bits representation also. There are different standards by which, the representation is implemented, i.e. number of bits for mantissa, number of bits for exponent etc., are standard defined. We will see the algorithm for our example.</p>

<h4>IEEE 754 defines two standards for real no as:</h4>
<ul>
	<p><li><a href="http://en.wikipedia.org/wiki/Single-precision_floating-point_format">Single precision (32-bit) floating point representation.</a></li></p>
	<table>
		<tr>
			<td>Sign(1bit)</td>
			<td>Exponent 2-9 (8 bits)</td>
			<td>Mantissa 10-32 (23 bits)</td>
		</tr>
	</table>
	<p><li><a href="http://en.wikipedia.org/wiki/Double-precision_floating-point_format">Double precision (64-bit) floating point representation.</a></li></p>
	<table>
		<tr>
			<td>Sign(1bit)</td>
			<td>Exponent 2-12 (11 bits)</td>
			<td>Mantissa 13-64 (52 bits)</td>
		</tr>
	</table>
</ul>
<p>
Let us represent 1100.011<br>
Read n ->1100.011<br>
Normalize ->1.100011E 00110101<br>
</p>
<table>
	<tr>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
	</tr>
</table>
<p>In the above representation <a href="#excess50">excess-50</a> notation is used. For understanding how to perform normalization, you can follow the link in <a href="#ref">references</a>.</p>

<h3 id="normalize">Normalization:</h3>
<p>
	There will be two parts of a normalized number, called mantissa and exponent. For our example, we will use 16-bit representation.
	For mantissa, shift the decimal to either right or left until there is a non-zero on its right and a zero on its left. And fill the remaining bits with zeros.<br>
	And the number of shifts will account for exponent. i.e. the number of shifts to left will be written as E+(no of shifts) and to right will be written as E-(no of shifts).<br>
	example:<br>
	100.011<br>
	Mantissa: 0.1000110<br>
	exponent: E+3 or E+00000011(binary)
</p>
<h3>Why normalization:</h3>
<p>As we see, the computer has a different representation of real numbers from one that we use. It stores bit combination for them. Every real number has a different representation, as the decimal can be anywhere in the number. So, when it comes to perform operation and manipulations on these numbers, as the computer can not understand the significance of decimal, it can not produce required results. So, for performing operations on these numbers, the numbers need to have a definite structure. Hence by normalizing the number, we provide a particular structure to the computer to represent it in a standard way.</p>	

<h3>Algorithm:</h3>
<p>
	<pre>
1.	Read m, e
2.	if MSB = 0
3.	    sign = ‘+’
4.	else
5.	    sign = ‘-‘    
6.	whilem > 1
7.	    m = m/10
8.	    E = e + 1
9.	while m < 0.9
10.	    m = m*10
11.	    E = e – 1
12.	write ‘sign’ + ‘e’ + ‘m’
	</pre>
</p>
<p>
	<h4 id="excess50">Excess 50 –</h4>
	A major problem with above notation could be of accuracy, when we need to assign the exponent a sign that is definitely necessary. But that sign takes up a bit, which leads to reduction in accuracy. So to avoid that, instead of representing the sign of exponent, we add 50 to the exponent when we store the number, and subtract the same while retrieving.
	As in above example, the exponent 3 is converted to 53. In this way we can represent the exponent without having to assign a sign. Though it results in compression of range for exponent, but that’s what the price for accuracy.
	For 32 bit and 64-bit representation there are different notation, as for 32 bit, there is bias-127 notation.
</p>
<h3 id="ref">References:</h3>
<a href="http://en.wikipedia.org/wiki/Normalized_number">Normalized_number</a><br>
<a href="/videos/">My Video-lecture</a>
