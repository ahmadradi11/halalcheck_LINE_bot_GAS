//import 'package:analyze_halal2/analyze_halal2.dart' as analyze_halal2;
//import 'package:trotter/trotter.dart';
//
//main(List<String> arguments) {
//  var pat = ['豚肉', '牛肉', '鶏肉', 'ショートニング'];
//
//  var list = [
//    '    て保存してください。',
//    '称',
//    '容量',
//    '造者',
//    '県○○市O0',
//    '(1斤は340 g 以上です)',
//    '食パン',
//    '原材料',
//    '名',
//    '小麦',
//    '粉',
//    '、',
//    '砂糖',
//    '、',
//    'シ',
//    'ョ',
//    'ー',
//    'ト',
//    'ニング',
//    '、',
//    '脱脂粉乳',
//    '、',
//    'イー',
//    'スト',
//    '、',
//    '食塩',
//    '/',
//    '乳化剤',
//    '(',
//    '大',
//    '豆',
//    '由来',
//    ')',
//    '、',
//    'イースト',
//    'フー',
//    'ド',
//    '、',
//    'カゼイン',
//    'Na',
//    '(',
//    '乳由',
//    '来',
//    ')',
//    '、',
//    'ビタミン',
//    'C',
//    '6',
//    '枚',
//    'HAR',
//    'O.00.00',
//    '保存',
//    '方法',
//    '直射',
//    '日光',
//    ',',
//    '高温',
//    '多',
//    '湿',
//    'を',
//    '避',
//    'け',
//    'て',
//    '保存',
//    'し',
//    'て',
//    'ください',
//    '。',
//    '名称',
//    '内容',
//    '量',
//    '製造者',
//    'O',
//    '○',
//    '県',
//    '○○',
//    '市',
//    'O0',
//    '1',
//    '斤',
//    '(',
//    '1',
//    '斤',
//    'は',
//    '340',
//    'g',
//    '以上',
//    'で',
//    'す',
//    ')',
//  ];
//
//  /*filter out all except japanese in list using regexp*/
//  final alphanumeric = RegExp(r'^[一-龠ぁ-ゔァ-ヴー]+$');
//  var filtered = [];
//  for (var text in list) {
//    if (alphanumeric.hasMatch(text)) {
//      filtered.add(text);
//      //print(text);
//    }
//  }
//  for (var patt in pat) {
//    scan(filtered, patt);
//  }
//}
//
//void scan(var list, String ing) {
//  var patt = ing;
//  /*find any pattern match  of the ingredient from the filtered list  */
//  var matched = [];
//  for (var txt in list) {
//    RegExp exp = new RegExp(txt);
//    Iterable<Match> matches = exp.allMatches(patt);
//    for (Match m in matches) {
//      String match = m.group(0);
//      matched.add(match);
//      print(match);
//    }
//  }
//  /*try to merge all match pattern */
//  print(matched.join());
//}
