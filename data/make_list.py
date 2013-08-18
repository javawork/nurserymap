# -*- coding:utf-8 -*-
import codecs
import re
import os

area = 'data/hwasung'

def concatenate_category_str(result, ustr, key_word, seperator):
	key = unicode(key_word, 'euc-kr').encode('utf-8')
	if re.search(key, ustr, re.UNICODE) <> None:
		if len(result) == 0:
			result = key
		else:
			result = result + seperator + key
	return result

def get_category(str):
	ustr = str.encode('utf-8')
	result = unicode('', 'euc-kr').encode('utf-8')
	
	seperator = '/'
	result = concatenate_category_str(result, ustr, '민간', seperator)
	result = concatenate_category_str(result, ustr, '가정', seperator)
	result = concatenate_category_str(result, ustr, '미인증', seperator)
	result = concatenate_category_str(result, ustr, '우수인증', seperator)
	result = concatenate_category_str(result, ustr, '일반인증', seperator)
	result = concatenate_category_str(result, ustr, '공공형', seperator)
	result = concatenate_category_str(result, ustr, '국공립', seperator)
	return result

def get_between_str(str, start, end):
	pos1 = str.find(start)
	if pos1 == -1:
		return ''
	
	pos1 = pos1 + len(start)
	pos2 = str[pos1:].find(end)
	return str[pos1:pos1+pos2]
	
def whatisthis(s):
	if isinstance(s, str):
		print "ordinary string"
	elif isinstance(s, unicode):
		print "unicode string"
	else:
		print "not a string"	

def write_list(str):
	id = get_between_str(str, "javascript:goDetailPage('", "'")
	address = get_between_str(str, '<span class="search_addr">', '</span>')
	title = get_between_str(str, '<li class="first orange"><strong>', '</strong>')
	phone = get_between_str(str, '<li class="black">', '</li>')
	ucategory = get_category(str)
	uid = id.encode('utf-8')
	utitle = title.encode('utf-8')
	uaddress = address.encode('utf-8')
	uphone = phone.encode('utf-8')
	fw = codecs.open('%s/list.txt'%(area), 'a')
	fw.write('%s;%s;%s;%s;%s\n'%(uid, utitle.strip(), uaddress, uphone, ucategory ))
	fw.close()

for i in range(0, 200):
	input_file = '%s/result%d.html'%(area,i)
	if os.path.exists(input_file) == False:
		continue
		
	f = codecs.open(input_file, 'r', 'utf-8')

	whole_str = f.read()
	f.close();

	cur_pos = 0
	while(True):
		pos1 = whole_str[cur_pos:].find('javascript:goDetailPage')
		if pos1 == -1:
			break
			
		pos2 = whole_str[cur_pos+pos1:].find('</a>')

		#print step1, step2
		start = cur_pos+pos1
		end = cur_pos+pos1 + pos2
		#print whole_str[start:end]

		write_list(whole_str[start:end])
		cur_pos = end 
	
